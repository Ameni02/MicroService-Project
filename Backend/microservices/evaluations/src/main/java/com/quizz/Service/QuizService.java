package com.quizz.Service;

import com.quizz.Dto.AnswerSubmission;
import com.quizz.Dto.QuizDto;
import com.quizz.Dto.QuizDtoWithoutQuestions;
import com.quizz.Dto.QuizWithIdDto;
import com.quizz.Entity.*;
import com.quizz.Repository.OptionsRepository;
import com.quizz.Repository.QuestionRepository;
import com.quizz.Repository.QuizRepository;
import com.quizz.Repository.QuizResultRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class QuizService {

    private final QuizRepository quizRepository;
    private final QuestionRepository questionRepository;
    private final OptionsRepository optionsRepository;
    private final QuizResultRepository quizResultRepository;

    public QuizService(QuizRepository quizRepository, QuestionRepository questionRepository, OptionsRepository optionsRepository, QuizResultRepository quizResultRepository) {
        this.quizRepository = quizRepository;
        this.questionRepository = questionRepository;
        this.optionsRepository = optionsRepository;
        this.quizResultRepository = quizResultRepository;
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

                option.setText(optionDto.text());
                option.setCorrect(optionDto.isCorrect());
                option.setQuestion(question);

                optionsRepository.save(option);
            }
        }

        return quizRepository.save(quiz);
    }


    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    public QuizResult calculateScoreAndSave(Long quizId, Long userId, List<AnswerSubmission> answers) {
        int score = 0;
        Quiz quiz = getQuizById(quizId);

        for (AnswerSubmission answer : answers) {
            Optional<Question> questionOpt = questionRepository.findById(answer.questionId());

            if (questionOpt.isPresent()) {
                Question question = questionOpt.get();
                Optional<Options> selectedOptionOpt = optionsRepository.findById(answer.optionId());

                if (selectedOptionOpt.isPresent()) {
                    Options selectedOption = selectedOptionOpt.get();
                    if (selectedOption.isCorrect()) {
                        score++;  // ✅ Increase the score if the answer is correct
                    }
                }
            }
        }

        // ✅ Create and save the result
        QuizResult quizResult = new QuizResult();
        quizResult.setScore(score);
        quizResult.setQuiz(quiz);

        // ✅ Associate user with the result
        User user = new User();
        user.setId(userId);
        quizResult.setUser(user);

        return quizResultRepository.save(quizResult);
    }
    


    public Quiz addQuizWithQuestionsAndOptions(QuizDto quizDto) {
        // ✅ Create and save the quiz first
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDto.title());
        quiz.setDescription(quizDto.description());
        quiz.setVerified(quizDto.isVerified() != null ? quizDto.isVerified() : false);

        quiz = quizRepository.save(quiz); // ✅ Save first to get the ID

        // ✅ Now add questions to the saved quiz
        for (QuizDto.QuestionDto questionDto : quizDto.questions()) {
            Question question = new Question();
            question.setText(questionDto.text());
            question.setType(questionDto.type());
            question.setQuiz(quiz);
            question = questionRepository.save(question); // ✅ Save question to get the ID

            // ✅ Now add options for the question
            for (QuizDto.OptionDto optionDto : questionDto.options()) {
                Options option = new Options();
                option.setText(optionDto.text());
                option.setCorrect(optionDto.isCorrect());
                option.setQuestion(question);
                optionsRepository.save(option); // ✅ Save each option
            }
        }

        return quiz;
    }

    public List<QuizDtoWithoutQuestions> getAllQuizzesWithoutQuestions() {
        List<Quiz> quizzes = quizRepository.findAll();
        return quizzes.stream()
                .map(quiz -> new QuizDtoWithoutQuestions(quiz.getId(), quiz.getTitle(), quiz.getDescription()))
                .collect(Collectors.toList());
    }

    public QuizDto getQuizWithDetails(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId).orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<QuizDto.QuestionDto> questionsDto = questionRepository.findByQuizId(quizId).stream()
                .map(question -> new QuizDto.QuestionDto(
                        question.getText(),
                        question.getType(),
                        optionsRepository.findByQuestionId(question.getId()).stream()
                                .map(option -> new QuizDto.OptionDto(option.getText(), option.isCorrect()))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());

        return new QuizDto(
                quiz.getTitle(),
                quiz.getDescription(),
                quiz.isVerified(),
                questionsDto
        );
    }

    public Quiz saveGeneratedQuiz(QuizDto quizDto) {
        Quiz quiz = new Quiz();
        quiz.setTitle(quizDto.title());
        quiz.setDescription(quizDto.description());

        // Save the quiz first to generate an ID
        quiz = quizRepository.save(quiz);

        for (QuizDto.QuestionDto questionDto : quizDto.questions()) {
            Question question = new Question();
            question.setText(questionDto.text());
            question.setType(questionDto.type());
            question.setQuiz(quiz);

            question = questionRepository.save(question);

            for (QuizDto.OptionDto optionDto : questionDto.options()) {
                Options option = new Options();
                option.setText(optionDto.text());
                option.setCorrect(optionDto.isCorrect());
                option.setQuestion(question);

                optionsRepository.save(option);
            }
        }

        return quiz;
    }
    public QuizWithIdDto getQuizWithDetailsForUser(Long quizId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));

        List<QuizWithIdDto.QuestionWithIdDto> questionsDto = questionRepository.findByQuizId(quizId).stream()
                .map(question -> new QuizWithIdDto.QuestionWithIdDto(
                        question.getId(), // ✅ Ensure ID is included
                        question.getText(),
                        question.getType(),
                        optionsRepository.findByQuestionId(question.getId()).stream()
                                .map(option -> new QuizWithIdDto.OptionWithIdDto(
                                        option.getId(), // ✅ Ensure ID is included
                                        option.getText(),
                                        option.isCorrect()
                                ))
                                .collect(Collectors.toList())
                ))
                .collect(Collectors.toList());

        return new QuizWithIdDto(
                quiz.getId(),
                quiz.getTitle(),
                quiz.getDescription(),
                questionsDto
        );
    }

}

