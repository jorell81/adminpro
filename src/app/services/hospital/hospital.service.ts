import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { URL_SERVICIOS } from '../../config/config';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {


  constructor(public http: HttpClient,
              public _usuarioService: UsuarioService) {
  }

  cargarHospitales(desde: number = 0){
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;

    return this.http.get(url);
  }

  obtenerHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get(url).pipe(map((resp: any) => resp.hospital));
  }

  borrarHospital(id: string){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this._usuarioService.token;

    return this.http.delete(url).pipe(map( resp => {
      Swal.fire('Hospital Borrado', 'El hospital a sido eliminado correctamente', 'success');
      return true;
    }));
  }

  crearHospital( nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this._usuarioService.token;
    return this.http.post( url, {nombre} )
              .pipe(
                map((resp: any) => {
                Swal.fire('Hospital creado', nombre, 'success');
                return resp.hospital;
    }));
  }

  buscarHospital( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(map((resp: any) => resp.hospitales));
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this._usuarioService.token;
    
    return this.http.put( url, hospital).pipe(map( (resp: any) => {

      Swal.fire('Hospital actualizado', hospital.nombre, 'success');
      return true;
    }));
  }

}
