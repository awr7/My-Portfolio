import { Component } from '@angular/core';
import { AboutTableComponent } from '../about-table/about-table.component';

@Component({
  selector: 'app-about-me',
  standalone: true,
  imports: [AboutTableComponent],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.scss'
})
export class AboutMeComponent {

}
