import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
import { MatSnackBar } from '@angular/material/snack-bar';
import {QuizService} from "../../../services/quiz.service";

@Component({
  selector: 'app-take-quiz',
  templateUrl: './take-quiz.component.html',
  standalone: false,
  styleUrls: ['./take-quiz.component.css']
})
export class TakeQuizComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') stepper!: MatStepper;

  quizId!: number;
  quiz: any;
  selectedAnswers: { questionId: number, optionId?: number }[] = [];
  userId: number = 1; // Remplace par l'ID réel de l'utilisateur

  // ⏳ Timer Variables
  timeLeft: number = 600; // 10 minutes en secondes
  interval: any; // Stocke l'intervalle du timer
  displayTime: string = ''; // Affichage du timer formaté (mm:ss)
  warningSound = new Audio('/assets/warning.mp3'); // ⚠️ Son d'alerte (ajoute le fichier dans /assets)

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadQuiz();
  }

  loadQuiz(): void {
    this.quizService.getQuizForUser(this.quizId).subscribe(
      (data) => {
        this.quiz = data;
        this.selectedAnswers = this.quiz.questions.map((q: { id: number }) => ({ questionId: q.id }));
        console.log('✅ Quiz chargé:', this.quiz);

        // 🕒 Démarrer le timer après le chargement du quiz
        this.startTimer();
      },
      (error) => {
        this.showAlert('❌ Erreur lors du chargement du quiz', 'error');
        console.error('❌ Erreur de chargement:', error);
      }
    );
  }

  startTimer(): void {
    this.updateDisplayTime(); // Afficher le temps initial

    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;

        if (this.timeLeft === 10) {
          this.warningSound.play(); // ⚠️ Jouer un son d'avertissement quand il reste 10 secondes
          if (navigator.vibrate) {
            navigator.vibrate(500); // 📱 Vibrer sur mobile
          }
        }

        this.updateDisplayTime();
      } else {
        this.showAlert('⏳ Temps écoulé ! Quiz soumis automatiquement.', 'warning');
        clearInterval(this.interval);
        this.submitQuiz(); // Auto-submit quand le temps atteint 0
      }
    }, 1000);
  }

  updateDisplayTime(): void {
    if (this.timeLeft < 10) {
      this.displayTime = `${this.timeLeft} sec`; // 🔥 Afficher seulement les secondes si < 10s
    } else {
      const minutes = Math.floor(this.timeLeft / 60);
      const seconds = this.timeLeft % 60;
      this.displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }

  ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  selectAnswer(index: number, optionId: number): void {
    this.selectedAnswers[index].optionId = optionId;
    console.log('✅ Réponses sélectionnées:', this.selectedAnswers);
  }

  isAnswered(index: number): boolean {
    return this.selectedAnswers[index].optionId !== undefined;
  }

  submitQuiz(): void {
    if (this.selectedAnswers.some(ans => ans.optionId === undefined)) {
      this.showAlert('⚠️ Répondez à toutes les questions avant de soumettre.', 'warning');
      return;
    }

    this.quizService.submitQuiz(this.quizId, this.userId, this.selectedAnswers).subscribe(
      (result) => {
        this.showAlert(`✅ Quiz soumis ! Score: ${result.score}/${this.quiz.questions.length}`, 'success');
        clearInterval(this.interval); // 🛑 Arrêter le timer après soumission
        setTimeout(() => this.router.navigate(['/quizzes']), 2000);
      },
      (error) => {
        this.showAlert('❌ Erreur lors de la soumission du quiz.', 'error');
        console.error('❌ Erreur de soumission:', error);
      }
    );
  }

  showAlert(message: string, type: 'success' | 'error' | 'warning'): void {
    this.snackBar.open(message, 'OK', {
      duration: 3000,
      panelClass: `snackbar-${type}`,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
