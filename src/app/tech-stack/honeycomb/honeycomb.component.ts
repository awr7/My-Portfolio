import { Component, OnInit } from '@angular/core';
import { TECH_STACK } from '../../data/tech-stack.data';
import { TechStackItem } from '../../models/tech-stack.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-honeycomb',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './honeycomb.component.html',
  styleUrl: './honeycomb.component.scss'
})
export class HoneycombComponent implements OnInit {
  techStackItems: TechStackItem[] = TECH_STACK;
  rows: TechStackItem[][] = [];

  ngOnInit(): void {
    this.createRows();
  }

  private createRows() {
    let rowIndex = 0;
    for (let i = 0; i < this.techStackItems.length; i++) {
      if (this.techStackItems[i].type !== 'divider') {
        if (!this.rows[rowIndex]) {
          this.rows[rowIndex] = [];
        }
        this.rows[rowIndex].push(this.techStackItems[i]);

        // Check if we need to move to the next row
        const isSecondInPair = rowIndex % 2 === 0 && this.rows[rowIndex].length === 2;
        const isThirdInTriplet = rowIndex % 2 === 1 && this.rows[rowIndex].length === 3;
        if (isSecondInPair || isThirdInTriplet) {
          rowIndex++;
        }
      }
    }
  }

  getTechColor(type: string): string {
    switch (type) {
       // placeholder until I think of better colors
      case 'language':
        return '#FFD580';
      case 'framework':
        return '#64C2A6'; 
      case 'database':
        return '#FF944D';
      case 'other':
      default:
        return '#8E7CC3';
    }
  }

}