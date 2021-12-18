CREATE TABLE IF NOT EXISTS `groupee`. `account` (
    `username` VARCHAR(15) UNIQUE NOT NULL,
    `password` VARCHAR(225) NOT NULL,
    `first_name` VARCHAR(54) NOT NULL,
    `last_name` VARCHAR(54) NOT NULL,
    `middle_name` VARCHAR(54),

    PRIMARY KEY (`username`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `student` (
    `student_id` INT(6) UNIQUE NOT NULL,
    `major` VARCHAR(4) NOT NULL,
    `first_name` VARCHAR(54) NOT NULL,
    `last_name` VARCHAR(54) NOT NULL,
    `middle_name` VARCHAR(54),

    PRIMARY KEY (`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `student_account` (
    `username` VARCHAR(15) NOT NULL,
    `student_id` INT(10) NOT NULL,
    
    FOREIGN KEY (`username`) REFERENCES `groupee`.`account`(`username`),
    FOREIGN KEY (`student_id`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `professor` (
    `professor_id` INT(6) UNIQUE NOT NULL,
    `username` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`professor_id`),
    FOREIGN KEY (`username`) REFERENCES `groupee`.`account`(`username`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `course` (
    `course_id` INT(4) NOT NULL,
    `course_name` VARCHAR(255) NOT NULL,
    `instructor_id` INT(10) NOT NULL,
    
    PRIMARY KEY (`course_id`),
    FOREIGN KEY (`instructor_id`) REFERENCES `groupee`.`professor`(`professor_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`.`group` (
    `group_no` INT(3) NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(54),
    `grade` VARCHAR(2),

    PRIMARY KEY (`group_no`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `classlist` (
    `course_id` INT(4) NOT NULL,
    `student_id` INT(6) NOT NULL,
    `section_no` INT(2) NOT NULL,
    `group_no` INT(3) DEFAULT NULL,

    FOREIGN KEY (`course_id`) REFERENCES `groupee`.`course`(`course_id`),
    FOREIGN KEY (`student_id`) REFERENCES `groupee`.`student`(`student_id`),
    FOREIGN KEY (`group_no`) REFERENCES `groupee`.`group` (`group_no`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `group_request` (
    `request_id` INT(6) UNIQUE,
    `poster_id` INT(6),
    `availability` VARCHAR(54) NOT NULL,
    `size` INT NOT NULL,
    `course_id` INT(6) NOT NULL,
    `section` INT(2) NOT NULL,
    `status` VARCHAR(20) DEFAULT 'looking for members',
    `comments` VARCHAR(255),
    
    PRIMARY KEY (`request_id`),
    FOREIGN KEY (`course_id`) REFERENCES `groupee`.`course`(`course_id`),
    FOREIGN KEY (`poster_id`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `comment` (
    `post_id` INT(6),
    `commenter_id` INT(6),
    `content` VARCHAR(255) DEFAULT NULL,
    `time_stamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (`post_id`) REFERENCES `groupee`. `group_request`(`request_id`),
    FOREIGN KEY (`commenter_id`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`.`join_request` (
    `post_id` INT(6),
    `student_id` INT(6),
    `status` VARCHAR(20) DEFAULT 'pending',
    
    FOREIGN KEY (`post_id`) REFERENCES `groupee`. `group_request`(`request_id`) ON DELETE SET NULL,
    FOREIGN KEY (`student_id`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`.`proposal` (
    `submission_id` INT(6),
    `group_no` INT(6),
    `submission_date` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `topic` VARCHAR(54),
    `description` VARCHAR(255),
    `status` VARCHAR(20) DEFAULT 'submitted',
    
    FOREIGN KEY (`group_no`) REFERENCES `groupee`. `group`(`group_no`)
);