import { Component } from '@angular/core';
import { TechStackComponent } from '../tech-stack/tech-stack.component';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [ TechStackComponent ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent {

}
