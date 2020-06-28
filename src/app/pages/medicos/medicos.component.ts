import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];

  constructor(public _medicoService: MedicoService) { }

  desde: number = 0;
  totalRegistros: number = 0;

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this._medicoService.cargarMedicos(this.desde).subscribe( (resp: any) => {
      console.log(resp);
      this.medicos = resp.medicos;
      this.totalRegistros = resp.total;
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
    this.cargarMedicos();
  }

  buscarMedico( termino: string){
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }
    this._medicoService.buscarMedicos( termino ).subscribe( (medicos: any) => {
      this.medicos = medicos;
    });
  }

  borrarMedico(medico: Medico){
    Swal.fire({
      title: 'Esta Seguro?',
      text: 'Esta a punto de borrar el ' + medico.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._medicoService.borrarMedico(medico._id).subscribe(borrado => {
          this.cargarMedicos();
          console.log(borrado);
        });
        // Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });
    
  }

}
