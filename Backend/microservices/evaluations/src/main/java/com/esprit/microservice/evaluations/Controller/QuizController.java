package com.esprit.microservice.evaluations.Controller;

import com.esprit.microservice.evaluations.Entities.Quiz;
import com.esprit.microservice.evaluations.QuizDTO.QuizDto;
import com.esprit.microservice.evaluations.Services.QuizService;
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



}


