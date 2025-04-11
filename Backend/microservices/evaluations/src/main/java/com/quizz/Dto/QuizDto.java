package com.quizz.Dto;

import java.util.List;

public record QuizDto(
        String title,
        String description,
        Boolean isVerified,
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
