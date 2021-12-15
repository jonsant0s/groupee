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

CREATE TABLE IF NOT EXISTS `groupee`. `classlist` (
    `course_id` INT(4) NOT NULL,
    `student_id` INT(6) NOT NULL,
    `section_no` INT(2) NOT NULL,

    FOREIGN KEY (`course_id`) REFERENCES `groupee`.`course`(`course_id`),
    FOREIGN KEY (`student_id`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `group_request` (
    `request_id` INT(6) UNIQUE,
    `poster_id` INT(6),
    `availability` VARCHAR(54) NOT NULL,
    `size` INT NOT NULL,
    `course_id` INT(6) NOT NULL,
    `section` INT(2) NOT NULL,
    `comments` VARCHAR(255),
    
    PRIMARY KEY (`request_id`),
    FOREIGN KEY (`course_id`) REFERENCES `groupee`.`course`(`course_id`),
    FOREIGN KEY (`poster_id`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`.`group` (
    `group_no` INT(3) NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(54) NOT NULL,
    `project_topic` VARCHAR(54),
    `grade` VARCHAR(2),

    PRIMARY KEY (`group_no`)
);


CREATE TABLE IF NOT EXISTS `groupee`. `comments` (
    `requester_id` INT(6),
    `student_id` INT(6),
    `interested` INT(1),
    `content` VARCHAR(255),
    
    FOREIGN KEY (`student_id`) REFERENCES `groupee`.`student`(`student_id`),
    FOREIGN KEY (`requester_id`) REFERENCES `groupee`. `group_request`(`requester_id`)
);