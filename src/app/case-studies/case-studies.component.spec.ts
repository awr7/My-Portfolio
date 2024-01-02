import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseStudysComponent } from './case-studies.component';

describe('CaseStudysComponent', () => {
  let component: CaseStudysComponent;
  let fixture: ComponentFixture<CaseStudysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CaseStudysComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaseStudysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
