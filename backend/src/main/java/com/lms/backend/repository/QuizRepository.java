package com.lms.backend.repository;

import com.lms.backend.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCourseId(Long courseId);
    List<Quiz> findByInstructorId(Long instructorId);
    List<Quiz> findByCourseIdAndIsActiveTrue(Long courseId);
}