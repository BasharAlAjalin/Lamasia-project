-- Insert sample users with plain text passwords (for testing legacy authentication)
INSERT INTO users (name, email, password, role, username, created_at) VALUES 
('Yousef AL-Bakri', 'yousef204b@gmail.com', 'yousef123', 'USER', 'yousef_al-bakri', CURRENT_TIMESTAMP),
('Basharrr', 'Basharrr@gmail.com', 'bebo123', 'ADMIN', 'basharrr', CURRENT_TIMESTAMP),
('azezz', 'azzez@gmail.com', '123123', 'INSTRUCTOR', 'azezz', CURRENT_TIMESTAMP);

-- Insert sample courses (using instructor from users table)
INSERT INTO courses (title, description, category, instructor_name, created_at, updated_at) VALUES 
('Introduction to Programming', 'Learn the basics of programming with hands-on exercises', 'Computer Science', 'azezz', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Web Development Fundamentals', 'Master HTML, CSS, and JavaScript for modern web development', 'Web Development', 'azezz', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Database Design', 'Learn how to design and implement efficient databases', 'Database', 'azezz', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Advanced Java Programming', 'Deep dive into advanced Java concepts and frameworks', 'Programming', 'azezz', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);