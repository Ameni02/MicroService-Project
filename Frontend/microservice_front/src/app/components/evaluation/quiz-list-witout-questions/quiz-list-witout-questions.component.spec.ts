import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizListWitoutQuestionsComponent } from './quiz-list-witout-questions.component';

describe('QuizListWitoutQuestionsComponent', () => {
  let component: QuizListWitoutQuestionsComponent;
  let fixture: ComponentFixture<QuizListWitoutQuestionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuizListWitoutQuestionsComponent]
    });
    fixture = TestBed.createComponent(QuizListWitoutQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
