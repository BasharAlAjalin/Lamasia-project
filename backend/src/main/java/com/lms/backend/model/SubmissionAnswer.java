package com.lms.backend.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "submission_answers")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class SubmissionAnswer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "submission_id", nullable = false)
    @ToString.Exclude
    private Submission submission;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    @ToString.Exclude
    private Question question;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String answer;

    @Column(name = "is_correct")
    private Boolean isCorrect;
}