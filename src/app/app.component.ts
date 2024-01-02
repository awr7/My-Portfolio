import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './projects/projects.component';
import { CaseStudysComponent } from './case-studies/case-studies.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WelcomeComponent, AboutMeComponent, HttpClientModule, ProjectsComponent, CaseStudysComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portfolio';
}
