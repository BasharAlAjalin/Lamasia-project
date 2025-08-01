package com.lms.backend.repository;

import com.lms.backend.model.QuizSubmission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface QuizSubmissionRepository extends JpaRepository<QuizSubmission, Long> {
    List<QuizSubmission> findByStudentId(Long studentId);
    List<QuizSubmission> findByQuizId(Long quizId);
    List<QuizSubmission> findByStudentIdAndQuizId(Long studentId, Long quizId);
    Optional<QuizSubmission> findByStudentIdAndQuizIdAndStatus(Long studentId, Long quizId, QuizSubmission.SubmissionStatus status);
    int countByStudentIdAndQuizId(Long studentId, Long quizId);
}