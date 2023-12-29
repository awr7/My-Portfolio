import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  active: boolean;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projects: Project[] = [
    {
      id: 'project1',
      title: 'assets/pawsTitle.png',
      description: 'A web application designed to address the challenges of stray dogs, unnecessary euthanasia, and overbreeding that escalated during the 2020 pandemic.',
      image: 'assets/winterDog.jpg',
      active: false
    },
    {
      id: 'project2',
      title: 'assets/syncSecureTitle.png',
      description: ' A Java-based project designed to generate and validate One-Time Passwords (OTPs), operating similarly to the well-known Duo application.',
      image: 'assets/OTP.png',
      active: false
    },
    {
      id: 'project3',
      title: 'assets/s3Title.png',
      description: 'S3 is a Java-based application mimicking Amazon S3 functionalities, enabling file retrieval and manipulation through a web interface.',
      image: 'assets/S3.jpg',
      active: false
    },
  ];

  activeIndex: number = 1;

  ngOnInit() {
    if (this.projects.length > 0) {
      this.projects[0].active = true;

      if (this.projects.length > 1) {
        // Rotate the array so the first project appears in the center
        this.rotateProjectsArray();
      }
    }
  }



  setActive(clickedProject: Project): void {
    const clickedIndex = this.projects.findIndex(p => p.id === clickedProject.id);

    if (this.activeIndex !== clickedIndex) {
      // Update active states
      this.projects[this.activeIndex].active = false;
      this.projects[clickedIndex].active = true;

      // Rearrange the array
      if (clickedIndex < this.activeIndex) {
        // If the clicked project is on the left, move the active project to the right
        const removed = this.projects.splice(this.activeIndex, 1)[0];
        this.projects.splice(clickedIndex, 0, removed);
      } else {
        // If the clicked project is on the right, move the active project to the left
        const removed = this.projects.splice(this.activeIndex, 1)[0];
        this.projects.splice(clickedIndex, 0, removed);
      }

      // Update activeIndex to the new position of the clicked project
      this.activeIndex = this.projects.findIndex(p => p.id === clickedProject.id);
    }
  }

  private rotateProjectsArray() {
    let firstProject = this.projects.shift();
  
    // Check if firstProject is indeed a Project object
    if (firstProject) {
      // Place it in the center of the array
      this.projects.splice(Math.floor(this.projects.length / 2), 0, firstProject);
    }
  }
}