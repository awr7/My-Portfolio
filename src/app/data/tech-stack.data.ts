import { TechStackItem } from '../models/tech-stack.model';

export const TECH_STACK: TechStackItem[] = [
  // Programming languages
  { name: 'JavaScript', type: 'language', icon: 'assets/icons/javascript.png' },
  { name: 'CSS', type: 'language', icon: 'assets/icons/css.png' },
  { name: 'HTML', type: 'language', icon: 'assets/icons/html.png' },
  { name: 'Python', type: 'language', icon: 'assets/icons/python.png' },
  { name: 'Java', type: 'language', icon: 'assets/icons/java.png' },
  { name: 'Typescript', type: 'language', icon: 'assets/icons/typescript.png' },
  { name: 'Sass', type: 'language', icon: 'assets/icons/sass.png' },
  
  { name: 'divider', type: 'divider', icon: '' },
  
  // Frameworks
  { name: 'Angular', type: 'framework', icon: 'assets/icons/angular.png' },
  { name: 'React', type: 'framework', icon: 'assets/icons/react.png' },
  { name: 'Django', type: 'framework', icon: 'assets/icons/django.png' },

  { name: 'divider', type: 'divider', icon: '' },
  
  // Databases
  { name: 'MySQL', type: 'database', icon: 'assets/icons/mySQL.png' },
  { name: 'Postgresql', type: 'database', icon: 'assets/icons/postgresql.png' },

  { name: 'divider', type: 'divider', icon: '' },

  // Other
  { name: 'Github', type: 'Other', icon: 'assets/icons/github.png' },
  { name: 'Gradle', type: 'Other', icon: 'assets/icons/gradle.png' },

  { name: 'divider', type: 'divider', icon: '' },
];
