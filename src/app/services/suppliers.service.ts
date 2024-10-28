import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/enviroment';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environmentPro } from '../../environments/enviroment.prod';
import { catchError, Observable, of, throwError } from 'rxjs';
import { PayedInvoices } from '../interfaces/PayedInvoices';

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




    // pagos efectuados
    getPayedInvoices(cardCode : string):Observable<PayedInvoices>{
      return this.http.get<PayedInvoices>(`${environmentPro.base_url}/payed-invoices?cardCode=${cardCode}`)
    }




    downloadPpdf(cardCode : string , withholdingNumnber:string){
      return this.http.get(`http://localhost:3000/pdf?cardCode=${cardCode}&withholdingNumnber=${withholdingNumnber}`)
    }










}
