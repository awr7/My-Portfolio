import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './projects/projects.component';
import { CaseStudysComponent } from './case-studies/case-studies.component';
import { ContactComponent } from './contact/contact.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, WelcomeComponent, AboutMeComponent, HttpClientModule, ProjectsComponent, CaseStudysComponent, ContactComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Portfolio';
  public isOpen = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  toggleMenu(): void {
    this.isOpen = !this.isOpen;
    const contentElement = this.el.nativeElement.querySelector('.content');
    const viewportHeight = window.innerHeight;

    if (this.isOpen) {

      const scrollPosition = window.scrollY; 
      const currentSection = Math.floor(scrollPosition / viewportHeight);
      const transformOriginY = currentSection * viewportHeight;
      this.renderer.setStyle(contentElement, 'transform-origin', `0 ${transformOriginY}px`);
      this.renderer.addClass(contentElement, 'shazam');
    } else {

      this.renderer.removeClass(contentElement, 'shazam');
      contentElement.addEventListener('transitionend', () => {

        if (!this.isOpen) {
          this.renderer.removeStyle(contentElement, 'transform-origin');
        }
      }, { once: true });
    }
  }
  
  closeMenu(): void {
    this.isOpen = false;
    const pageElement = this.el.nativeElement.querySelector('.page');
    this.renderer.removeClass(pageElement, 'shazam');
  }
}