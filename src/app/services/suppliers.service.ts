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



    getDateDedductiones(cardCode:string, dateFrom :string , dateTo : string){
      return this.http.get(`${environmentPro.base_url}/deductions-by-dates?cardCode=${cardCode}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
    }




        // pdf retenciones
        donwloadPdfMethod(cardCode : string , withholdingNumnber:string){
          return this.http.get(`http://52.207.189.125:3000/withholdings-with-filters?cardCode=${cardCode}&withholdingNumnber=${withholdingNumnber}`)
        }


        // excel
        // estado cuenta
        DownloadXlsStateCount(body:any){
          return this.http.post(`${environmentPro.base_url}/account-state-report`,{rows :body})
        }


        // estado de cuenta por fechas
        getQueryStateCountDate(cardCode:string, dateFrom :string , dateTo : string){
          return this.http.get(`${environmentPro.base_url}/account-state-by-dates?cardCode=${cardCode}&dateFrom=${dateFrom}&dateTo=${dateTo}`)
        }
        // estado de cuenta por fechas y numdoc
        getQueryStateCountDateCompro(carCode:string, dateFrom:string,dateTo:string, docNum:String){
          return this.http.get(`${environmentPro.base_url}/account-state-by-dates-and-docnum?cardCode=${carCode}&dateFrom=${dateFrom}&dateTo=${dateTo}&docNum=${docNum}`)
        }




        // detracciones
        DownloadXlsdetraccions(cardCode:string){
          return this.http.get(`${environmentPro.base_url}/deductions-report?cardCode=${cardCode}`)
        }

        getDeducctionsDocnumCardcode(cardCode:String,docNum:string){
          return this.http.get(`${environmentPro.base_url}/deductions-by-docnum?cardCode=${cardCode}&docNum=${docNum}`)
        }





        // retenciones
        DownloadXlsWithholdings(body:any){
          return this.http.post(`${environmentPro.base_url}/withholdings-report`,{ rows : body})
        }

        getWithholdingsquerycardCodeDocNum(cardCode:string, docNum:string){
          return this.http.get(`${environmentPro.base_url}/withholdings-by-docnum?cardCode=${cardCode}&docNum=${docNum}`);
        }






        // pagos efectuados
        DownloadXlsPaymentsMade(body:any){
          return this.http.post(`${environmentPro.base_url}/payed-invoices-report`,{rows:body})
        }














}
