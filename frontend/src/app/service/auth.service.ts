import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  Usuario } from '../../model/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private registrourl = 'http://localhost:3005/api/usuario/';
  private loginurl = 'http://localhost:3005/api/auth/';
  constructor( private http: HttpClient) { }

  registroUsuario(usuario : Usuario){
    return this.http.post<Usuario>(this.registrourl, usuario);
  }
  loginUsuario(usuario: Usuario){
    return this.http.post<Usuario>(this.loginurl, usuario);
  }
loginOn(){
  return !!localStorage.getItem('token');
};
obtenerToken(){
  return localStorage.getItem('token');
}
}
