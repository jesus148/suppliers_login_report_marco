import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/enviroment';
import { environmentPro } from '../../environments/enviroment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {




  // valores de los endpoints
  private myapp : string =  '';
  private myappi : string =  '';



  // veririfica si esta logeado
  islogedd : boolean = false;


  // guarda toda la data
  usuario : any ;


  //guarda mensaje actualizado

  mensaje : string =  '';


  // guarda toda la data
  rows : any;


  //guarda el cardCode
  CardCodeData : string = '';



  // inicia
  constructor( private http : HttpClient) {

    this.myapp = environment.base_url;

    this.myappi =   '/login-wp';

  }






  // metodo para entrar back local con mongo
  logueo( usuario :string , password : string){

    return  this.http.post(`${environment.base_url}/login-wp` , {usuario, password})
   }






// metodo logearse sap otro back
   loginSap( cardCode : string, password : string){
     return this.http.post(`${environmentPro.base_url}/login` , {cardCode , password})
   }



   // metodo pa actualizar contraseña
   updatePassword( usuario :string , password : string){
     return  this.http.put(`${environment.base_url}/contrasena/${usuario}` , { password})
    }






    //metodo para obtener data
    getData( CardCodeData :string){
      return  this.http.get(`${environment.base_url}/account-state?cardCode=${CardCodeData}` )
     }










}
