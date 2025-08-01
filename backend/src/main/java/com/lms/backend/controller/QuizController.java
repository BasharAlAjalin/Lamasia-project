package com.lms.backend.controller;

import com.lms.backend.model.*;
import com.lms.backend.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/quizzes")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:3000"}, allowCredentials = "true")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @GetMapping
    public ResponseEntity<List<Quiz>> getAllQuizzes() {
        List<Quiz> quizzes = quizService.getAllQuizzes();
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Quiz> getQuizById(@PathVariable Long id) {
        Optional<Quiz> quiz = quizService.getQuizById(id);
        return quiz.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Quiz>> getQuizzesByCourse(@PathVariable Long courseId) {
        List<Quiz> quizzes = quizService.getQuizzesByCourse(courseId);
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/instructor/{instructorId}")
    public ResponseEntity<List<Quiz>> getQuizzesByInstructor(@PathVariable Long instructorId) {
        List<Quiz> quizzes = quizService.getQuizzesByInstructor(instructorId);
        return ResponseEntity.ok(quizzes);
    }

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody Quiz quiz) {
        Quiz createdQuiz = quizService.createQuiz(quiz);
        return ResponseEntity.ok(createdQuiz);
    }

    @PostMapping("/course/{courseId}")
    public ResponseEntity<Quiz> createQuizForCourse(
            @PathVariable Long courseId,
            @RequestParam Long instructorId,
            @RequestBody Quiz quiz) {
        try {
            Quiz createdQuiz = quizService.createQuizForCourse(courseId, instructorId, quiz);
            return ResponseEntity.ok(createdQuiz);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Quiz> updateQuiz(@PathVariable Long id, @RequestBody Quiz quiz) {
        try {
            Quiz updatedQuiz = quizService.updateQuiz(id, quiz);
            return ResponseEntity.ok(updatedQuiz);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteQuiz(@PathVariable Long id) {
        quizService.deleteQuiz(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{quizId}/questions")
    public ResponseEntity<Question> addQuestionToQuiz(
            @PathVariable Long quizId,
            @RequestBody Question question) {
        try {
            Question createdQuestion = quizService.addQuestionToQuiz(quizId, question);
            return ResponseEntity.ok(createdQuestion);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{quizId}/questions")
    public ResponseEntity<List<Question>> getQuestionsByQuiz(@PathVariable Long quizId) {
        List<Question> questions = quizService.getQuestionsByQuiz(quizId);
        return ResponseEntity.ok(questions);
    }

    @PostMapping("/questions/{questionId}/options")
    public ResponseEntity<QuestionOption> addOptionToQuestion(
            @PathVariable Long questionId,
            @RequestBody QuestionOption option) {
        try {
            QuestionOption createdOption = quizService.addOptionToQuestion(questionId, option);
            return ResponseEntity.ok(createdOption);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/{quizId}/start")
    public ResponseEntity<QuizSubmission> startQuizAttempt(
            @PathVariable Long quizId,
            @RequestParam Long studentId) {
        try {
            QuizSubmission submission = quizService.startQuizAttempt(quizId, studentId);
            return ResponseEntity.ok(submission);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/submissions/{submissionId}/submit")
    public ResponseEntity<QuizSubmission> submitQuiz(
            @PathVariable Long submissionId,
            @RequestBody List<SubmissionAnswer> answers) {
        try {
            QuizSubmission submission = quizService.submitQuiz(submissionId, answers);
            return ResponseEntity.ok(submission);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/submissions/student/{studentId}")
    public ResponseEntity<List<QuizSubmission>> getSubmissionsByStudent(@PathVariable Long studentId) {
        List<QuizSubmission> submissions = quizService.getSubmissionsByStudent(studentId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/submissions/quiz/{quizId}")
    public ResponseEntity<List<QuizSubmission>> getSubmissionsByQuiz(@PathVariable Long quizId) {
        List<QuizSubmission> submissions = quizService.getSubmissionsByQuiz(quizId);
        return ResponseEntity.ok(submissions);
    }
}