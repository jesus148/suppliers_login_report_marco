import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { MenuModule } from "primeng/menu";
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessagesModule } from "primeng/messages";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    exports:[
    ] ,
    imports:[
      ButtonModule,
      ToastModule,
      BrowserModule,
      MenuModule ,
      MessagesModule,
      BrowserAnimationsModule
    ],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppMaterialModule{
}
