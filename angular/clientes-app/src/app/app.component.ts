import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'bienvenido a angular';

  curso: string = 'Curso spring5 con angular 7';
  profesor = 'Andrés Guzmán';
}
