package com.esprit.microservice.evaluations.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {



    @Autowired
    private final QuizService quizService;



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

    @PostMapping("/{quizId}/users/{userId}/submit")
    public ResponseEntity<QuizResult> calculateScoreAndSave(
            @PathVariable Long quizId,
            @PathVariable Long userId,
            @RequestBody List<AnswerSubmission> answers) {

        QuizResult quizResult = quizService.calculateScoreAndSave(quizId, userId, answers);
        return ResponseEntity.ok(quizResult);
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


}


