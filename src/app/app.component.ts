import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { AboutMeComponent } from './about-me/about-me.component';
import { HttpClientModule } from '@angular/common/http';
import { ProjectsComponent } from './projects/projects.component';
import { CaseStudysComponent } from './case-studies/case-studies.component';
import { ContactComponent } from './contact/contact.component';
import { Router } from '@angular/router';

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


  ngAfterViewInit() {
      
  }
  constructor(
    private el: ElementRef, 
    private renderer: Renderer2, 
    private router: Router // Inject the Angular Router
  ) {}

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

  scrollToElement(elementId: string, event: MouseEvent): void {
    event.preventDefault(); // Prevent default anchor behavior
    this.closeMenu();
  
    setTimeout(() => {
      const element = document.getElementById(elementId);
      if (element) {
        const targetPosition = element.offsetTop;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 800; // Duration of the scroll animation in milliseconds
        let startTime: number | null = null;
  
        const easeInOutQuad = (currentTime: number, startValue: number, changeInValue: number, duration: number) => {
          currentTime /= duration / 2;
          if (currentTime < 1) return (changeInValue / 2) * currentTime * currentTime + startValue;
          currentTime--;
          return (-changeInValue / 2) * (currentTime * (currentTime - 2) - 1) + startValue;
        };
  
        const animateScroll = (currentTime: number) => {
          if (!startTime) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const nextScrollY = easeInOutQuad(timeElapsed, startPosition, distance, duration);
          window.scrollTo(0, nextScrollY);
          if (timeElapsed < duration) {
            requestAnimationFrame(animateScroll);
          }
        };
  
        requestAnimationFrame(animateScroll);
      } else {
        console.error('Element with ID ' + elementId + ' not found!');
      }
    }, 350); // Delay to allow the menu to close
  }
}