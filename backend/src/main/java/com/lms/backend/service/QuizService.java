package com.lms.backend.service;

import com.lms.backend.model.Quiz;
import com.lms.backend.model.Course;
import com.lms.backend.repository.QuizRepository;
import com.lms.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Quiz getQuizById(Long id) {
        return quizRepository.findById(id).orElse(null);
    }

    public Quiz createQuiz(Long courseId, Quiz quiz) {
        Course course = courseRepository.findById(courseId).orElse(null);
        if (course == null) return null;

        quiz.setCourse(course);
        return quizRepository.save(quiz);
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    public List<Quiz> getQuizzesByCourseId(Long courseId) {
        return quizRepository.findByCourseId(courseId);
    }
}
