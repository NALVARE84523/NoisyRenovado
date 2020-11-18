import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private registrourl = 'http://localhost:3005/api/usuario/';
  private loginurl = 'http://localhost:3005/api/auth/';
  constructor( private http: HttpClient) { }

  registroUsuario(usuario){
    return this.http.post<any>(this.registrourl, usuario);
  }
  loginUsuario(usuario){
    return this.http.post<any>(this.loginurl, usuario);
  }
loginOn(){
  return !!localStorage.getItem('token');
};
obtenerToken(){
  return localStorage.getItem('token');
}
}
