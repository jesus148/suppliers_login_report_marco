
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";

import { MessageService } from 'primeng/api';
// ACA COLOCAMOS TODAS LAS IMPORTACIONES DE ANGULAR

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
    exports:[

    ] ,

    imports:[
      ButtonModule,
      ToastModule
    ],
    providers: [MessageService , ]


})
export class AppMaterialModule{

}
