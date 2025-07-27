package com.lms.backend.service;

import com.lms.backend.model.Course;
import com.lms.backend.model.Enrollment;
import com.lms.backend.model.User;
import com.lms.backend.repository.CourseRepository;
import com.lms.backend.repository.EnrollmentRepository;
import com.lms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    @Autowired
    private EnrollmentRepository enrollmentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CourseRepository courseRepository;

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public List<Enrollment> getEnrollmentsByUserId(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

    public List<Enrollment> getEnrollmentsByCourseId(Long courseId) {
        return enrollmentRepository.findByCourseId(courseId);
    }

    public Enrollment enroll(Long studentId, Long courseId) {
        Optional<Enrollment> existing = enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId);
        if (existing.isPresent()) return existing.get();

        User student = userRepository.findById(studentId).orElseThrow();
        Course course = courseRepository.findById(courseId).orElseThrow();

        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        enrollment.setCompleted(false);
        return enrollmentRepository.save(enrollment);
    }

    public void unenroll(Long studentId, Long courseId) {
        enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId)
                .ifPresent(enrollmentRepository::delete);
    }

    public void markCompleted(Long studentId, Long courseId) {
        enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId)
                .ifPresent(enrollment -> {
                    enrollment.setCompleted(true);
                    enrollmentRepository.save(enrollment);
                });
    }
}
