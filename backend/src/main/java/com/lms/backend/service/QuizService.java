package com.lms.backend.service;

import com.lms.backend.model.*;
import com.lms.backend.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private QuestionOptionRepository questionOptionRepository;

    @Autowired
    private QuizSubmissionRepository submissionRepository;

    @Autowired
    private SubmissionAnswerRepository submissionAnswerRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public Optional<Quiz> getQuizById(Long id) {
        return quizRepository.findById(id);
    }

    public List<Quiz> getQuizzesByCourse(Long courseId) {
        return quizRepository.findByCourseIdAndIsActiveTrue(courseId);
    }

    public List<Quiz> getQuizzesByInstructor(Long instructorId) {
        return quizRepository.findByInstructorId(instructorId);
    }

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public Quiz createQuizForCourse(Long courseId, Long instructorId, Quiz quiz) {
        Course course = courseRepository.findById(courseId)
                .orElseThrow(() -> new RuntimeException("Course not found"));
        User instructor = userRepository.findById(instructorId)
                .orElseThrow(() -> new RuntimeException("Instructor not found"));

        quiz.setCourse(course);
        quiz.setInstructor(instructor);
        return quizRepository.save(quiz);
    }

    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        Quiz quiz = quizRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        
        quiz.setTitle(updatedQuiz.getTitle());
        quiz.setDescription(updatedQuiz.getDescription());
        quiz.setTimeLimit(updatedQuiz.getTimeLimit());
        quiz.setMaxAttempts(updatedQuiz.getMaxAttempts());
        quiz.setIsActive(updatedQuiz.getIsActive());
        
        return quizRepository.save(quiz);
    }

    public void deleteQuiz(Long id) {
        quizRepository.deleteById(id);
    }

    public Question addQuestionToQuiz(Long quizId, Question question) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        
        question.setQuiz(quiz);
        return questionRepository.save(question);
    }

    public List<Question> getQuestionsByQuiz(Long quizId) {
        return questionRepository.findByQuizIdOrderByQuestionOrder(quizId);
    }

    public QuestionOption addOptionToQuestion(Long questionId, QuestionOption option) {
        Question question = questionRepository.findById(questionId)
                .orElseThrow(() -> new RuntimeException("Question not found"));
        
        option.setQuestion(question);
        return questionOptionRepository.save(option);
    }

    public QuizSubmission startQuizAttempt(Long quizId, Long studentId) {
        Quiz quiz = quizRepository.findById(quizId)
                .orElseThrow(() -> new RuntimeException("Quiz not found"));
        User student = userRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Check if student has exceeded max attempts
        int attemptCount = submissionRepository.countByStudentIdAndQuizId(studentId, quizId);
        if (quiz.getMaxAttempts() != null && attemptCount >= quiz.getMaxAttempts()) {
            throw new RuntimeException("Maximum attempts exceeded");
        }

        // Check if there's an ongoing attempt
        Optional<QuizSubmission> ongoingSubmission = submissionRepository
                .findByStudentIdAndQuizIdAndStatus(studentId, quizId, QuizSubmission.SubmissionStatus.IN_PROGRESS);
        if (ongoingSubmission.isPresent()) {
            return ongoingSubmission.get();
        }

        QuizSubmission submission = QuizSubmission.builder()
                .quiz(quiz)
                .student(student)
                .attemptNumber(attemptCount + 1)
                .status(QuizSubmission.SubmissionStatus.IN_PROGRESS)
                .build();

        return submissionRepository.save(submission);
    }

    public QuizSubmission submitQuiz(Long submissionId, List<SubmissionAnswer> answers) {
        QuizSubmission submission = submissionRepository.findById(submissionId)
                .orElseThrow(() -> new RuntimeException("Submission not found"));

        // Save answers
        for (SubmissionAnswer answer : answers) {
            answer.setSubmission(submission);
            submissionAnswerRepository.save(answer);
        }

        // Grade the quiz
        gradeQuizSubmission(submission);

        submission.setStatus(QuizSubmission.SubmissionStatus.SUBMITTED);
        return submissionRepository.save(submission);
    }

    private void gradeQuizSubmission(QuizSubmission submission) {
        List<SubmissionAnswer> answers = submissionAnswerRepository.findBySubmissionId(submission.getId());
        double totalScore = 0;
        double maxScore = 0;

        for (SubmissionAnswer answer : answers) {
            Question question = answer.getQuestion();
            maxScore += question.getPoints();

            if (question.getType() == Question.QuestionType.MULTIPLE_CHOICE || 
                question.getType() == Question.QuestionType.TRUE_FALSE) {
                
                if (answer.getSelectedOption() != null && answer.getSelectedOption().getIsCorrect()) {
                    answer.setIsCorrect(true);
                    answer.setPointsEarned((double) question.getPoints());
                    totalScore += question.getPoints();
                } else {
                    answer.setIsCorrect(false);
                    answer.setPointsEarned(0.0);
                }
            }
            // Note: Short answer questions would need manual grading
            
            submissionAnswerRepository.save(answer);
        }

        submission.setScore(totalScore);
        submission.setMaxScore(maxScore);
        submission.setPercentage(maxScore > 0 ? (totalScore / maxScore) * 100 : 0);
        submission.setStatus(QuizSubmission.SubmissionStatus.GRADED);
    }

    public List<QuizSubmission> getSubmissionsByStudent(Long studentId) {
        return submissionRepository.findByStudentId(studentId);
    }

    public List<QuizSubmission> getSubmissionsByQuiz(Long quizId) {
        return submissionRepository.findByQuizId(quizId);
    }
}