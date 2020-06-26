import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(public _usuarioService: UsuarioService,
              public _modalUploadService: ModalUploadService) { }

  ngOnInit() {
    this.cargarUsuarios();
    this._modalUploadService.notificacion.subscribe( resp => {
      this.cargarUsuarios();
    });
  }

  mostarModal( id: string){
    this._modalUploadService.mostrarModal( 'usuarios', id);
  }

  cargarUsuarios(){
    this.cargando = true;
    this._usuarioService.cargarUsuarios(this.desde).subscribe( (resp: any) => {
      this.totalRegistros = resp.total;
      this.usuarios = resp.usuarios;
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
    this.cargarUsuarios();
  }


  // termino de busqueda en la base de datos
  buscarUsuario( termino: string){

    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }
    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino ).subscribe( (usuarios: Usuario[]) => {
      console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario){
    
    if (usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
      return;
    }
    
    Swal.fire({
      title: 'Esta Seguro?',
      text: 'Esta a punto de borrar a ' + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario( usuario._id ).subscribe(borrado => {
          this.cargarUsuarios();
          console.log(borrado);
        });
        // Swal.fire('Eliminado!', 'El usuario ha sido eliminado.', 'success');
      }
    });

    
  }

  guardarUsuario( usuario: Usuario){
    this._usuarioService.actualizarUsuario( usuario ).subscribe();
  }


}
