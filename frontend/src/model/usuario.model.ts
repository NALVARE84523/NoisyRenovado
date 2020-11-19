//import Date;
import { FechaRegistro } from './fecha-registro.model'
export class Usuario {
  nombre: string = '';
  nombreUsuario: string = '';
  correo: string = '';
  password: string = '';
  fechaRegistro: FechaRegistro = new FechaRegistro();
}
