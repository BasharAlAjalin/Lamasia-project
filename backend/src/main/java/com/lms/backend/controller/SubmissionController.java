package com.lms.backend.controller;

import com.lms.backend.model.Submission;
import com.lms.backend.service.SubmissionService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping
    public Submission submit(@RequestBody Submission submission) {
        return submissionService.saveSubmission(submission);
    }

    @GetMapping
    public List<Submission> getAll() {
        return submissionService.getAllSubmissions();
    }

    @GetMapping("/{id}")
    public Submission getById(@PathVariable Long id) {
        return submissionService.getSubmissionById(id);
    }
}
