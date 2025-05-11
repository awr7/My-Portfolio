import { Component, Renderer2, ElementRef, ViewChild, AfterViewInit, OnDestroy  } from '@angular/core';
import { TECH_STACK } from '../data/tech-stack.data'
import { TechStackItem } from '../models/tech-stack.model';
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
  
    // Function to calculate the width of a single item
    const calculateItemWidth = (item: TechStackItem) => {
      const screenWidth = window.innerWidth;
      if (item.type === 'divider') {
        // Estimate the divider width as a fraction of the font size
        return screenWidth < 820 ? 40 * 0.2 : 60 * 0.2;
      } else {
        return screenWidth < 820 ? 45 : 60; // Width for tech stack items
      }
    };

  
    // Function to calculate total width of all items
    const calculateTotalWidth = () => {
      const gap = 15;
      return TECH_STACK.reduce((total, item) => total + calculateItemWidth(item) + gap, 0);
    };
  
    let totalWidthOfItems = calculateTotalWidth();
    // Re-calculate total width on window resize
    window.addEventListener('resize', () => {
      totalWidthOfItems = calculateTotalWidth();
    });
  
    const baseSpeed = 69; // Nice :)
    let lastTime = Date.now();
  
    let animate = () => {
      const now = Date.now();
      const deltaTime = now - lastTime;
      lastTime = now;
  
      const distance = (baseSpeed * deltaTime) / 1000;
  
      if (container.scrollLeft >= totalWidthOfItems) {
        container.scrollLeft = 0;
      } else {
        container.scrollLeft += distance;
      }
  
      window.requestAnimationFrame(animate);
    };
  
    window.requestAnimationFrame(animate);
  }
}