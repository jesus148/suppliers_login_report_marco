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
  public islogedd : boolean = true;
  // guarda toda la data del usuario
  usuario : any ;
  //guarda mensaje actualizado
  mensaje : string =  '';


  // guarda toda la data
  rows : any ;
  //guarda el cardCode
  CardCodeData : string = '';
  // datos del usuario o proveddor,-
  CardName : string ='' ;






  // inicia
  constructor( private http : HttpClient ,
    private router : Router
  ) {

    this.myapp = environment.base_url;

    this.myappi =   '/login-wp';

  }










// metodo logearse sap otro back
   loginSap( cardCode : string, password : string){
     return this.http.post(`${environmentPro.base_url}/login` , {cardCode , password})
   }





   // metodo pa actualizar contraseña
   updatePassword( cardCode :string , password : string){
     return  this.http.put(`${environmentPro.base_url}/change-password` , { cardCode , password})
    }






    //metodo para obtener data estado de cuenta
    getData( CardCodeData :string){
      return  this.http.get(`${environmentPro.base_url}/account-state?cardCode=${CardCodeData}` )
     }




    //  metodo salir de la sesion
    logout(){
      localStorage.removeItem('object');
      this.islogedd = false;
      this.router.navigateByUrl('/login');
    }















}
