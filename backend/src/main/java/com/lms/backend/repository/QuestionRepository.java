package com.lms.backend.repository;

import com.lms.backend.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Long> {
    List<Question> findByQuizIdOrderByQuestionOrder(Long quizId);
    List<Question> findByQuizId(Long quizId);
}