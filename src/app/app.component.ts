import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet ] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  // agregar esto si usas primeng
  providers: [MessageService]
})
export class AppComponent {
  title = 'front_login';
}
