import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/enviroment';
import { HttpClient } from '@angular/common/http';
import { environmentPro } from '../../environments/enviroment.prod';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {



  // valores de los endpoints
  private myapp : string =  '';
  private myappi : string =  '';



  // guardar data datos banco


  // inicia
  constructor( private http : HttpClient ,
    private router : Router) {
    this.myapp = environment.base_url;
    this.myappi = '/bank-account';

  }


// metodo rest obtiene del proveedor
  getBankAccount(cardCode : string ){
    return this.http.get(`${environmentPro.base_url}/bank-account?cardCode=${cardCode}`)
  }


    registerBanck2(body: any){
      return this.http.post( `${environmentPro.base_ur2}/test` , body);
    }




    updateBanck2(body:any){
      return this.http.post(`${environmentPro.base_ur2}/create-update-bank-account`, body )
    }




    // deducciones

    getDeductions(cardCode : string){
      return this.http.get(`${environmentPro.base_url}/deductions?cardCode=${cardCode}`)
    }



    // retenciones
    getWithholdings(cardCode : string){
      return this.http.get(`${environmentPro.base_url}/withholdings?cardCode=${cardCode}`)
    }












}
