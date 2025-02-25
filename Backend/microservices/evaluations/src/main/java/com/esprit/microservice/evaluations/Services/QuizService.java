package com.esprit.microservice.evaluations.Services;

import com.esprit.microservice.evaluations.Entities.Options;
import com.esprit.microservice.evaluations.Entities.Question;
import com.esprit.microservice.evaluations.Entities.Quiz;
import com.esprit.microservice.evaluations.QuizDTO.QuizDto;
import com.esprit.microservice.evaluations.Repositories.OptionsRepo;
import com.esprit.microservice.evaluations.Repositories.QuestionRepo;
import com.esprit.microservice.evaluations.Repositories.QuizRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service

public class QuizService {
    @Autowired
    private final QuizRepo quizRepository;

    @Autowired
    private final QuestionRepo questionRepository;
    @Autowired
    private final OptionsRepo optionsRepository;


    public QuizService(QuizRepo quizRepository, QuestionRepo questionRepository, OptionsRepo optionsRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.optionsRepository = optionsRepository;

    }


    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public List<Quiz> getAllQuizzesWithQuestions() {
        return quizRepository.findAllWithQuestions();
    }

    // Get quiz by ID
    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElseThrow(() -> new RuntimeException("Quiz not found"));
    }

    public Quiz updateQuiz(Long quizId, QuizDto quizDto) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));

        // Update quiz details
        quiz.setTitle(quizDto.title());
        quiz.setDescription(quizDto.description());

        // Update or create questions
        for (QuizDto.QuestionDto questionDto : quizDto.questions()) {
            Question question = questionRepository.findByText(questionDto.text()) // Use a suitable identifier, like ID or text.
                    .orElse(new Question()); // If the question doesn't exist, create a new one.

            question.setText(questionDto.text());
            question.setType(questionDto.type());
            question.setQuiz(quiz);

            question = questionRepository.save(question);

            // Update or create options for the question
            for (QuizDto.OptionDto optionDto : questionDto.options()) {
                Options option = optionsRepository.findByText(optionDto.text())
                        .orElse(new Options()); // If the option doesn't exist, create a new one.



                optionsRepository.save(option);
            }
        }

        return quizRepository.save(quiz); // Save the quiz after updating everything
    }

    // Delete a quiz
    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    // Calculate score and save result

}
