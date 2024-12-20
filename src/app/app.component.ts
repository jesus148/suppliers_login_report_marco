import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessageService } from 'primeng/api';
import { IMAGE_CONFIG } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from "./spinner/spinner/spinner.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NgxSpinnerModule, SpinnerComponent] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // agregar esto si usas primeng
  providers: [MessageService

  ]
})
export class AppComponent {
  title = 'front_login';
}
