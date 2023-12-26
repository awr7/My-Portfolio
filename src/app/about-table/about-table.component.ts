import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-about-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-table.component.html',
  styleUrl: './about-table.component.scss'
})
export class AboutTableComponent {
  tabs = ['About Me', 'Tech Stack', 'Fun Facts'];
  activeTab: string = this.tabs[0]; // Default to about me tab

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
