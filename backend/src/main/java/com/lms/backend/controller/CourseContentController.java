package com.lms.backend.controller;

import com.lms.backend.model.CourseContent;
import com.lms.backend.service.CourseContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contents")
@CrossOrigin(origins = "*")
public class CourseContentController {

    @Autowired
    private CourseContentService contentService;

    @PostMapping("/upload")
    public ResponseEntity<?> uploadContent(
            @RequestParam Long courseId,
            @RequestParam String title,
            @RequestParam String type, // PDF or VIDEO
            @RequestParam String url // Can be uploaded file path or YouTube link
    ) {
        CourseContent content = contentService.uploadContent(courseId, title, type, url);
        return ResponseEntity.ok(content);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CourseContent>> getContents(@PathVariable Long courseId) {
        return ResponseEntity.ok(contentService.getContentsByCourse(courseId));
    }
}
