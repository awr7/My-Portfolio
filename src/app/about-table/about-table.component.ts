import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-about-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-table.component.html',
  styleUrl: './about-table.component.scss',
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [style({ opacity: 0 }), animate(300)]),
      transition(':leave', animate(300, style({ opacity: 0 })))
    ]),
  ]
})
export class AboutTableComponent {
  tabs = ['About Me', 'Tech Stack', 'Fun Facts'];
  activeTab: string = this.tabs[0];
  fadeOutInProgress = false;
  fadeInInProgress = false;

  setActiveTab(tab: string) {
    // Instantly update the tab background
    this.activeTab = tab;

    // Start the fade-out animation for the content
    this.fadeOutInProgress = true;

    setTimeout(() => {
      // After the fade-out, update content and start fade-in
      this.fadeOutInProgress = false;
      this.fadeInInProgress = true;

      setTimeout(() => {
        this.fadeInInProgress = false;
      }, 250); // Same as the duration of fadeIn animation
    }, 250); // Same as the duration of fadeOut animation
  }
  
  getBackgroundPosition(): string {
    const tabIndex = this.tabs.indexOf(this.activeTab);
    return `${(100 / this.tabs.length) * tabIndex}%`;
  }
}
