import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-case-study-card',
  standalone: true,
  imports: [],
  templateUrl: './case-study-card.component.html',
  styleUrl: './case-study-card.component.scss'
})
export class CaseStudyCardComponent {
  @Input() title: string = '';
  @Input() imageUrl: string = '';
  @Input() description: string = '';
  @Input() studyLink: string = '';

  openLink() {
    window.open(this.studyLink, '_blank');
  }
}