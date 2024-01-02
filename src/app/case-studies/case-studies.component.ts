import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudyCardComponent } from '../case-study-card/case-study-card.component';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, CaseStudyCardComponent],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss'
})
export class CaseStudysComponent {
  caseStudies = [
    {
      title: 'PCA and Decision Trees',
      imageUrl: 'assets/drose.jpg',
      description: 'Diving into PCA and Decision Trees.',
      studyLink: 'https://github.com/awr7'
    },
    {
      title: 'PCA and Decision Trees',
      imageUrl: 'assets/drose.jpg',
      description: 'Diving into PCA and Decision Trees.',
      studyLink: 'https://github.com/awr7'
    },
    {
      title: 'PCA and Decision Trees',
      imageUrl: 'assets/drose.jpg',
      description: 'Diving into PCA and Decision Trees.',
      studyLink: 'https://github.com/awr7'
    },
  ];

}
