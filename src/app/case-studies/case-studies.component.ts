import { Component, ElementRef, ViewChild, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseStudyCardComponent } from '../case-study-card/case-study-card.component';

@Component({
  selector: 'app-case-studies',
  standalone: true,
  imports: [CommonModule, CaseStudyCardComponent],
  templateUrl: './case-studies.component.html',
  styleUrl: './case-studies.component.scss'
})
export class CaseStudysComponent implements AfterViewInit {

  @ViewChild('cardsContainer', { static: false }) cardsContainerRef!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    // need this to safely use this.cardsContainerRef.nativeElement
  }

  originalCaseStudies  = [
    {
      title: 'PCA and Decision Trees',
      imageUrl: 'assets/pcaAnd.png',
      description: 'Diving into the world of Principal Component Analysis (PCA) and Decision Tree classification on the well-known Flower dataset.',
      studyLink: 'https://github.com/awr7/Machine-Learning-Algorithms/blob/main/PCA_and_Decision_Tree_Classification.ipynb'
    },
    {
      title: 'Convolutional Neural Networks',
      imageUrl: 'assets/cnn.png',
      description: 'Explores image classification using Convolution Neural Networks (CNNs) on the FashionMNIST dataset.',
      studyLink: 'https://github.com/awr7/Machine-Learning-Algorithms/blob/main/Convolutional_Neural_Networks.ipynb'
    },
    {
      title: 'Multi-Layer Perceptron',
      imageUrl: 'assets/multiLayerPerceptron.png',
      description: 'Showcase the power of neural networks to tackle approximating complex 1D functions and classifying handwritten digits fro the MNIST dataset.',
      studyLink: 'https://github.com/awr7/Machine-Learning-Algorithms/blob/main/Multi_Layer_Perceptron.ipynb'
    },

    {
      title: 'Support Vector Machines',
      imageUrl: 'assets/svm.png',
      description: 'Diving into the  intricate world of Support Vector Machines (SVMs), showcasing their versatility in handling both linear and non-linear classification tasks.',
      studyLink: 'https://github.com/awr7/Machine-Learning-Algorithms/blob/main/Support_Vector_Machines.ipynb'
    },

    {
      title: 'Linear Regression',
      imageUrl: 'assets/linearRegression.png',
      description: 'Implementing and and exploring the power of the Linear Regression algorithm on the popular Boston Housing dataset.',
      studyLink: 'https://github.com/awr7/Machine-Learning-Algorithms/blob/main/Linear_Regression.ipynb'
    },

    {
      title: 'Logistic Regression and Perceptron',
      imageUrl: 'assets/logisticRegression.png',
      description: 'Implementing and analyzing Logistic Regression and Perceptron using Maximum Likelihood Estimation (MLE) techniques and foundational learning update mechanism.',
      studyLink: 'https://github.com/awr7/Machine-Learning-Algorithms/blob/main/Logistic_Regresion_and_Perceptron.ipynb'
    },
  ];

  caseStudies = [...this.originalCaseStudies];
  currentIndex = 0;

  showNextSet() {
    if (this.currentIndex < this.originalCaseStudies.length - 3) {
      this.animateCards('animate-out');
      setTimeout(() => {
        this.currentIndex++;
        this.updateCardsView();
        this.animateCards('animate-in');
      }, 500);
    }
  }

  showPreviousSet() {
    if (this.currentIndex > 0) {
      this.animateCards('animate-out');
      setTimeout(() => {
        this.currentIndex--;
        this.updateCardsView();
        this.animateCards('animate-in');
      }, 500);
    }
  }

  private animateCards(animationClass: string) {
    if (this.cardsContainerRef && this.cardsContainerRef.nativeElement) {
      const cardsContainer = this.cardsContainerRef.nativeElement;
      this.renderer.addClass(cardsContainer, animationClass);
      setTimeout(() => {
        this.renderer.removeClass(cardsContainer, animationClass);
      }, 500);
    }
  }

  updateCardsView() {
    // Create a new array with the current set of case studies to be displayed
    const startIndex = this.currentIndex * 3;
    this.caseStudies = [
      ...this.originalCaseStudies.slice(startIndex, startIndex + 3),
      ...this.originalCaseStudies.slice(0, startIndex)
    ];
  }

  isActiveCard(index: number): boolean {
    let startIndex = this.currentIndex * 3;
    return index >= startIndex && index < startIndex + 3;
}

  get visibleCaseStudies() {
    let startIndex = this.currentIndex * 3;
    return this.originalCaseStudies.slice(startIndex, startIndex + 3);
  }
}