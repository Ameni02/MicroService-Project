import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnonceFrontComponent } from './annonce-front.component';

describe('AnnonceFrontComponent', () => {
  let component: AnnonceFrontComponent;
  let fixture: ComponentFixture<AnnonceFrontComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnnonceFrontComponent]
    });
    fixture = TestBed.createComponent(AnnonceFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
