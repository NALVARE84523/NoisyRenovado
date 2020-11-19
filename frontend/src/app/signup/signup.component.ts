import { Component, OnInit } from '@angular/core';
//import {AuthService} from '../service/auth.service';
//import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
 export class SignupComponent implements OnInit {
  ngOnInit(): void {
  }

 /*constructor(private auth: AuthService, private router: Router) { }

  
  registrarUsuario= {
    nombre:'',
    nombreUsuario: '',
    correo:'',
    password:'',
    }
    ngOnInit(): void {
    }
    registrar(){
    this.auth.registroUsuario(this.registrarUsuario).subscribe(
      (res)=> {
        console.log(res);
        this.router.navigate(['/login']);
      },
      (err)=> console.log(err)
    )
    }*/
}
