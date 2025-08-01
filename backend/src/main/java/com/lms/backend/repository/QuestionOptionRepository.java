package com.lms.backend.repository;

import com.lms.backend.model.QuestionOption;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionOptionRepository extends JpaRepository<QuestionOption, Long> {
    List<QuestionOption> findByQuestionIdOrderByOptionOrder(Long questionId);
    List<QuestionOption> findByQuestionId(Long questionId);
}