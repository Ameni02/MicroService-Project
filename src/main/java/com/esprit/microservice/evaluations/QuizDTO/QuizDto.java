package com.esprit.microservice.evaluations.QuizDTO;



import java.util.List;

public record QuizDto(
        String title,
        String description,
        List<QuestionDto> questions
) {
    public record QuestionDto(
            String text,
            String type,
            List<OptionDto> options
    ) {}

    public record OptionDto(
            String text,
            boolean isCorrect
    ) {}
}
