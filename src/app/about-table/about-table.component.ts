import { Component, ElementRef, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, style, transition, animate } from '@angular/animations';
import { HoneycombComponent } from '../tech-stack/honeycomb/honeycomb.component';

@Component({
  selector: 'app-about-table',
  standalone: true,
  imports: [CommonModule, HoneycombComponent],
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
  newActiveTab: string = this.tabs[0];
  tabStates: { [key: string]: { fadingOut: boolean; fadingIn: boolean } } = {};

  constructor() {
    // Initialize state for each tab
    this.tabs.forEach(tab => {
      this.tabStates[tab] = { fadingOut: false, fadingIn: false };
    });
  }

  setActiveTab(newTab: string) {
    if (newTab !== this.activeTab) {
      const oldTab = this.activeTab;
      this.activeTab = newTab;

      if (oldTab) {
        this.tabStates[oldTab].fadingOut = true;
      }

      setTimeout(() => {
        this.newActiveTab = newTab;
        this.tabStates[newTab].fadingIn = true;

        setTimeout(() => {
          if (oldTab) {
            this.tabStates[oldTab].fadingOut = false;
          }
          this.tabStates[newTab].fadingIn = false;
        }, 500);
      }, 250);
    }
  }

  getBackgroundPosition(): string {
    const tabIndex = this.tabs.indexOf(this.activeTab);
    return `${(100 / this.tabs.length) * tabIndex}%`;
  }
}
