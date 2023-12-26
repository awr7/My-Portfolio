import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit, OnDestroy  } from '@angular/core';
import { TECH_STACK } from '../data/tech-stack.data'
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tech-stack',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tech-stack.component.html',
  styleUrls: ['./tech-stack.component.scss']
})
export class TechStackComponent implements AfterViewInit, OnDestroy {
  techStack = [...TECH_STACK, ...TECH_STACK, ...TECH_STACK]; // Triple items for smoother looping
  @ViewChild('scrollContainer') private scrollContainer!: ElementRef;
  private scrollListener: Function | null = null;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.startScroll();
  }

  ngOnDestroy() {
    if (this.scrollListener) {
      this.scrollListener();
    }
  }

  private startScroll(): void {
    if (typeof window === 'undefined') {
      return; // Exit if window is not defined
    }
    const container = this.scrollContainer.nativeElement;
    const speed = 1;
  
    let move = () => {
      let maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft > maxScrollLeft - 100) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += speed;
      }
    };
  
    let animate = () => {
      move();
      window.requestAnimationFrame(animate); // Directly use window
    };
  
    window.requestAnimationFrame(animate); // Start the loop
  }
}