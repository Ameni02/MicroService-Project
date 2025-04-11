package com.quizz.Controller;

import com.quizz.quizz.Dto.AnswerSubmission;
import com.quizz.quizz.Dto.QuizDto;
import com.quizz.quizz.Dto.QuizDtoWithoutQuestions;
import com.quizz.quizz.Dto.QuizWithIdDto;
import com.quizz.Entity.Quiz;
import com.quizz.Entity.QuizResult;
import com.quizz.Service.QuizService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;

    public QuizController(QuizService quizService) {
        this.quizService = quizService;
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz createdQuiz = quizService.createQuiz(quiz);
        return ResponseEntity.ok(createdQuiz);
    }

    @GetMapping("/all-with-questions")
    public ResponseEntity<List<Quiz>> getAllQuizzesWithQuestions() {
        List<Quiz> quizzes = quizService.getAllQuizzesWithQuestions();
        return ResponseEntity.ok(quizzes);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        Quiz quiz = quizService.getQuizById(id);
        return ResponseEntity.ok(quiz);
    }

    @PutMapping("/{id}")
    public Quiz updateQuiz(@PathVariable Long id, @RequestBody QuizDto quizDto) {
        return quizService.updateQuiz(id, quizDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.noContent().build();
    }

    /*  @PostMapping("/{quizId}/users/{userId}/submit")
      public ResponseEntity<QuizResult> calculateScoreAndSave(
              @PathVariable Long quizId,
              @PathVariable Long userId,
              @RequestBody List<AnswerSubmission> answers) {

          QuizResult quizResult = quizService.calculateScoreAndSave(quizId, userId, answers);
          return ResponseEntity.ok(quizResult);
      }*/
    @GetMapping("/{quizId}/user-details")
    public ResponseEntity<QuizWithIdDto> getQuizWithDetailsForUser(@PathVariable Long quizId) {
        return ResponseEntity.ok(quizService.getQuizWithDetailsForUser(quizId));
    }

    @PostMapping("/questions")
    public ResponseEntity<Quiz> addQuizWithQuestions(@RequestBody QuizDto quizDto) {
        // Save the quiz along with its questions and options
        Quiz quiz = quizService.addQuizWithQuestionsAndOptions(quizDto);
        return ResponseEntity.ok(quiz);
    }

    @GetMapping("/all")
    public ResponseEntity<List<QuizDtoWithoutQuestions>> getAllQuizzesWithoutQuestions() {
        List<QuizDtoWithoutQuestions> quizzes = quizService.getAllQuizzesWithoutQuestions();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{id}/details")
    public QuizDto getQuizWithDetails(@PathVariable Long id) {
        return quizService.getQuizWithDetails(id);
    }

    @PostMapping("/{quizId}/submit/{userId}")
    public ResponseEntity<QuizResult> submitQuiz(
            @PathVariable Long quizId,
            @PathVariable Long userId,
            @RequestBody List<AnswerSubmission> answers
    ) {
        QuizResult result = quizService.calculateScoreAndSave(quizId, userId, answers);
        return ResponseEntity.ok(result);
    }
}

