import { Component, OnInit } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _hospitalService: HospitalService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarHospitales();
    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarHospitales();
    });
  }

  mostarModal( id: string){
    this._modalUploadService.mostrarModal( 'hospitales', id);
  }


  cargarHospitales(){
    this.cargando = true;
    this._hospitalService.cargarHospitales(this.desde).subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.hospitales = resp.hospitales;
      this.cargando = false;
    });

  }

  cambiarDesde( valor: number){
    let desde = this.desde + valor;

    if ( desde >= this.totalRegistros) {
      return;
    }

    if ( desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  obtenerHospital(id: string){
    

  }

  borrarHospital(hospital: Hospital){
    Swal.fire({
      title: 'Esta Seguro?',
      text: 'Esta a punto de borrar el ' + hospital.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._hospitalService.borrarHospital(hospital._id).subscribe(borrado => {
          this.cargarHospitales();
          console.log(borrado);
        });
        // Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });
    
  }

  buscarHospital( termino: string ){
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }
    this.cargando = true;
    this._hospitalService.buscarHospital( termino ).subscribe( (hospitales: Hospital[]) => {
      console.log(hospitales);
      this.hospitales = hospitales;
      this.cargando = false;
    });
  }

  guardarHospital(hospital: Hospital){
    this._hospitalService.actualizarHospital(hospital).subscribe();
  }

  crearHospital(){
    Swal.fire({
      title: 'Crear hsopital',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      showLoaderOnConfirm: true,
      preConfirm: (nombre) => {

        if (!nombre) {
          Swal.showValidationMessage(
            `Petición fallida: Hospital requerido`
          );
        }
          
      },
      allowOutsideClick: () => !Swal.isLoading()
    }).then((result: any) => {
      if (!result.value) {
        return;
      }
      this._hospitalService.crearHospital(result.value).subscribe();
    });
  }



}
