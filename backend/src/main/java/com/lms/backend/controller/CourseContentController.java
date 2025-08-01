package com.lms.backend.controller;

import com.lms.backend.model.CourseContent;
import com.lms.backend.service.CourseContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174", "http://localhost:3000"}, allowCredentials = "true")
public class CourseContentController {

    @Autowired
    private CourseContentService courseContentService;

    private final String UPLOAD_DIR = "uploads/";

    // Handle URL-based content upload (existing functionality)
    @PostMapping("/course-contents")
    public ResponseEntity<CourseContent> uploadContentByUrl(@RequestBody CourseContentRequest request) {
        try {
            CourseContent content = courseContentService.uploadContent(
                request.getCourse().getId(),
                request.getTitle(),
                request.getType(),
                request.getUrl()
            );
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Handle file upload
    @PostMapping("/contents/upload")
    public ResponseEntity<CourseContent> uploadContentFile(
            @RequestParam Long courseId,
            @RequestParam String title,
            @RequestParam String type,
            @RequestParam(required = false) MultipartFile file,
            @RequestParam(required = false) String url) {
        try {
            String fileUrl;
            
            if (file != null && !file.isEmpty()) {
                // Handle file upload
                fileUrl = saveFile(file);
            } else if (url != null && !url.isEmpty()) {
                // Handle URL-based content
                fileUrl = url;
            } else {
                return ResponseEntity.badRequest().build();
            }

            CourseContent content = courseContentService.uploadContent(courseId, title, type, fileUrl);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Get course content
    @GetMapping("/contents/course/{courseId}")
    public ResponseEntity<List<CourseContent>> getCourseContent(@PathVariable Long courseId) {
        try {
            List<CourseContent> contents = courseContentService.getContentsByCourse(courseId);
            return ResponseEntity.ok(contents);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Alternative endpoint for course content (used by courses.jsx)
    @GetMapping("/courses/{courseId}/content")
    public ResponseEntity<List<CourseContent>> getCourseContentAlternative(@PathVariable Long courseId) {
        try {
            List<CourseContent> contents = courseContentService.getContentsByCourse(courseId);
            return ResponseEntity.ok(contents);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    // Legacy endpoint for compatibility
    @GetMapping("/course-contents/course/{courseId}")
    public ResponseEntity<List<CourseContent>> getCourseContentLegacy(@PathVariable Long courseId) {
        try {
            List<CourseContent> contents = courseContentService.getContentsByCourse(courseId);
            return ResponseEntity.ok(contents);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    private String saveFile(MultipartFile file) throws IOException {
        // Create uploads directory if it doesn't exist
        Path uploadPath = Paths.get(UPLOAD_DIR);
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        // Generate unique filename
        String originalFilename = file.getOriginalFilename();
        String extension = originalFilename.substring(originalFilename.lastIndexOf("."));
        String uniqueFilename = UUID.randomUUID().toString() + extension;
        
        // Save file
        Path filePath = uploadPath.resolve(uniqueFilename);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        
        // Return relative URL
        return "/uploads/" + uniqueFilename;
    }

    // DTO class for request body
    public static class CourseContentRequest {
        private String title;
        private String type;
        private String url;
        private CourseReference course;

        // Getters and setters
        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        
        public String getType() { return type; }
        public void setType(String type) { this.type = type; }
        
        public String getUrl() { return url; }
        public void setUrl(String url) { this.url = url; }
        
        public CourseReference getCourse() { return course; }
        public void setCourse(CourseReference course) { this.course = course; }

        public static class CourseReference {
            private Long id;
            
            public Long getId() { return id; }
            public void setId(Long id) { this.id = id; }
        }
    }
}