import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TECH_STACK } from '../data/tech-stack.data';
import { TechStackItem } from '../models/tech-stack.model';
interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  features: string[];
  techStack?: string[];
  image: string;
  active: boolean;
  liveUrl?: string;
  sourceCodeUrl: string;
  overlayImage?: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent implements OnInit {

  projects: Project[]=[];

  activeIndex: number = 1;
  showOverlay: boolean = false;
  selectedProject: Project | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.projects = [
      {
        id: 'project1',
        title: 'assets/pawsTitle.png',
        description: 'A web application designed to address the challenges of stray dogs, unnecessary euthanasia, and overbreeding that escalated during the 2020 pandemic.',
        longDescription: 'Welcome to Paws4Homes, a web application designed to address the challenges of stray dogs, unnecessary euthanasia, and overbreeding that escalated during the 2020 pandemic. Paws4Homes is designed to alleviate these issues by connecting shelters, breeders, and potential pet owners, thereby ensuring the well-being and proper care of dogs.', 
        features:['Account creation for shelters/breeders and customers.', 'Add, edit or delete dog listings,', 'Direct communication through a built-in chat', 'Handle adoption applications', 'Edit account details.' , 'Customers benefit from a tailored dog matching quiz',  'Access to a catalog of dogs' ,'The ability to apply for adoption, and direct communication with shelters or breeders.'],
        image: 'assets/winterDog.jpg',
        techStack: ['JavaScript', 'HTML', 'CSS','Python','React','Django','Postgresql',],
        active: false,
        liveUrl:'https://paws4homes.vercel.app/',
        sourceCodeUrl:'https://github.com/awr7/Paws4Homes',
        overlayImage: 'assets/paws4homes.png'
      },
      {
        id: 'project2',
        title: 'assets/syncSecureTitle.png',
        description: ' A Java-based project designed to generate and validate One-Time Passwords (OTPs), operating similarly to the well-known Duo application.',
        longDescription:'SyncSecure is a Java-based project designed to generate and validate One-Time Passwords (OTPs), operating similarly to the well-known Duo application. This project was made lightweight and with a modular structure, the project allows for easy customization and integration into various systems requiring secure authentication methods.',
        features: ['Two-Component Architecture: DuoT (Token): Responsible for generating OTPs DuoV (Validator): Serves as an authentication server.', 'Dynamic OTP Generation', 'Socket communication', 'Efficent Communication Protocol makes the application function with only having to ever send 6 bytes of data.', 'Embedded Web Server', 'Timer-Based OTPs'],
        image: 'assets/OTP.png',
        techStack: ['Java'],
        active: false,
        sourceCodeUrl:'https://github.com/awr7/SyncSecure'
      },
      {
        id: 'project3',
        title: 'assets/s3Title.png',
        description: 'S3-Proto-Stream is a Java-based application mimicking Amazon S3 functionalities, enabling file retrieval and manipulation through a web interface.',
        longDescription: 'S3-Proto-Stream is a lightweight, Java-based server application designed to emulate a subset of Amazon AWS S3s GetObject functionality. This project is focuses on the handling of GET requests for local and remote files using specific URI formats. Built using a lightweight and modular structure for allowing easy integration into various systems.',
        features: ['Remote and Local fetching.', 'File Manipulation capable of fetching specific byte ranges from files, both local and remote.','Supports custom URI formats', 'Developed with no standard wrapper classes or libraries instead dealing with raw bytes and int data.','Capable of fetching specific byte ranges from files, both local and remote.'],
        image: 'assets/S3.jpg',
        techStack: ['Java'],
        active: false,
        sourceCodeUrl:'https://github.com/awr7/S3-Proto-Stream'
      },
    ];
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

  showProjectDetails(project: Project): void {
    this.selectedProject = project;
    this.showOverlay = true;
    this.cdr.markForCheck();
    document.body.style.overflow = 'hidden';
  }

  closeOverlay(): void {
    this.showOverlay = false;
    this.cdr.markForCheck();
    document.body.style.overflow = 'auto';
  }

  trackByProjectId(index: number, project: Project): string {
    return project.id;
  }

  getTechIcons(techNames: string[]): TechStackItem[] {
    return techNames.map(name => TECH_STACK.find(tech => tech.name === name))
                    .filter(tech => tech !== undefined) as TechStackItem[];
  }
  
  
}