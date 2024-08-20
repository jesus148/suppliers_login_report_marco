
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule }
    from "@angular/platform-browser/animations";
    import { MenuModule } from "primeng/menu";
import { MessageService } from 'primeng/api';
// ACA COLOCAMOS TODAS LAS IMPORTACIONES DE ANGULAR

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

@NgModule({
    exports:[

    ] ,

    imports:[
      ButtonModule,
      ToastModule,
      BrowserModule,
      BrowserAnimationsModule,
      MenuModule
    ],
    providers: [MessageService , ]


})
export class AppMaterialModule{

}
