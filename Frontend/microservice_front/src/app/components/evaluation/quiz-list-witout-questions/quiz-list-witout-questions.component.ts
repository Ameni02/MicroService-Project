import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {QuizService} from "../../../services/quiz.service";
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-quiz-list',
  standalone: false,
  templateUrl: './quiz-list-without-questions.component.html',
  styleUrls: ['./quiz-list-without-questions.component.css']
})
export class QuizListWitoutQuestionsComponent implements OnInit, AfterViewInit {
  quizzes: any[] = [];
  dataSource = new MatTableDataSource<any>(); // Use MatTableDataSource for pagination
  searchQuery: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator; // Bind paginator after view initializes
  }

  // Load quizzes from service
  loadQuizzes(): void {
    this.quizService.getAllQuizzesWithoutQuestions().subscribe(
      (data) => {
        this.quizzes = data;
        this.dataSource.data = data; // Assign data to MatTableDataSource
        this.dataSource.paginator = this.paginator; // Ensure paginator updates
        console.log('Quizzes loaded:', this.quizzes);
      },
      (error) => {
        console.error('Error loading quizzes:', error);
      }
    );
  }

  // Filter quizzes based on search input
  filterQuizzes(): void {
    const query = this.searchQuery.toLowerCase();
    this.dataSource.data = this.quizzes.filter(quiz =>
      quiz.title.toLowerCase().includes(query) || quiz.description.toLowerCase().includes(query)
    );

    // Reset pagination after filtering
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.filterQuizzes();
  }

  deleteQuiz(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce quiz ?')) {
      this.quizService.deleteQuiz(id).subscribe(
        () => {
          console.log(`Quiz avec ID ${id} supprimé avec succès.`);
          this.quizzes = this.quizzes.filter((quiz) => quiz.id !== id);
          this.filterQuizzes();
        },
        (error) => {
          console.error('Erreur lors de la suppression du quiz:', error);
        }
      );
    }
  }
}
