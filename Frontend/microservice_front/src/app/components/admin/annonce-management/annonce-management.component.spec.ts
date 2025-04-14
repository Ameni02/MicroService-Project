import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceManagementComponent } from './annonce-management.component';

describe('AnnonceManagementComponent', () => {
  let component: AnnonceManagementComponent;
  let fixture: ComponentFixture<AnnonceManagementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceManagementComponent]
    });
    fixture = TestBed.createComponent(AnnonceManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
