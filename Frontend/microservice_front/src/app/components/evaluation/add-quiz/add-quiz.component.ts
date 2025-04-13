import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {QuizService} from "../../../services/quiz.service";


@Component({
  selector: 'app-add-quiz',
  standalone:false,
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.css']
})
export class AddQuizComponent implements OnInit {
  quizForm!: FormGroup;


  constructor(
    private fb: FormBuilder,
    private quizService: QuizService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.quizForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      questions: this.fb.array([this.createQuestion()])
    });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      type: ['', Validators.required],
      options: this.fb.array([this.createOption()])
    });
  }

  createOption(aiOption: any = null): FormGroup {
    return this.fb.group({
      text: [aiOption ? aiOption.text : '', Validators.required],
      isCorrect: [aiOption ? aiOption.correct : false]
    });
  }

  get questions(): FormArray {
    return this.quizForm.get('questions') as FormArray;
  }

  getOptions(questionIndex: number): FormArray {
    return (this.quizForm.get('questions') as FormArray)
      .at(questionIndex)
      .get('options') as FormArray;
  }

  addQuestion(): void {
    this.questions.push(this.createQuestion());
  }

  addOption(questionIndex: number): void {
    this.getOptions(questionIndex).push(this.createOption());
  }

  // Cancel the last option added for a specific question
  cancelOption(questionIndex: number) {
    const options = this.getOptions(questionIndex);
    if (options.length > 1) {
      options.removeAt(options.length - 1);
    }
  }

  // Cancel the last added question
  cancelQuestion(questionIndex: number) {
    this.questions.removeAt(questionIndex);
  }

  onSubmit(): void {
    if (this.quizForm.valid) {
      const quizData = this.quizForm.value;
      const quizPayload = {
        title: quizData.title,
        description: quizData.description,
        questions: quizData.questions.map((question: any) => ({
          text: question.text,
          type: question.type || 'Multiple choice', // ✅ Ensure type is always defined
          options: question.options.map((option: any) => ({
            text: option.text,
            isCorrect: option.isCorrect || false // ✅ Ensure `isCorrect` is always a boolean
          }))
        }))
      };

      // ✅ Debugging Log (Check What is Sent to Backend)
      console.log('Submitting Quiz:', quizPayload);

      // ✅ Send the quiz to backend
      this.quizService.addQuiz(quizPayload).subscribe(response => {
        this.router.navigate(['/quiz-list']);  // ✅ Navigate after successful submission
      });
    } else {
      console.error('Quiz Form is invalid:', this.quizForm);
    }
  }

  addAiQuestion(aiQuestion: any = null): void {
    if (!aiQuestion) return; // ✅ Avoid adding empty questions

    const questionGroup = this.fb.group({
      text: [aiQuestion.question, Validators.required],
      type: ['Multiple choice', Validators.required],
      options: this.fb.array(
        aiQuestion.options ? aiQuestion.options.map((opt: any) => this.createOption(opt)) : [this.createOption()]
      )
    });

    this.questions.push(questionGroup);
  }

}
