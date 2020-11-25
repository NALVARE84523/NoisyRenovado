import { Component, OnInit } from '@angular/core';
declare var reproductor: any;

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.css', '../../assets/css/icono.min.css']
})
export class ReproductorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  play(){
    reproductor();
  }

}
