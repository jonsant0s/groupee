CREATE TABLE IF NOT EXISTS `groupee`. `account` (
    `username` VARCHAR(15) UNIQUE NOT NULL,
    `password` VARCHAR(15) NOT NULL,
    `first_name` VARCHAR(54) NOT NULL,
    `middle_name` VARCHAR(54),
    `last_name` VARCHAR(54) NOT NULL,

    PRIMARY KEY (`username`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `student` (
    `student_id` INT(6) UNIQUE NOT NULL,
    `section_no` INT(2) NOT NULL,
    `major` VARCHAR(4) NOT NULL,
    `first_name` VARCHAR(54) NOT NULL,
    `middle_name` VARCHAR(54),
    `last_name` VARCHAR(54) NOT NULL,

    PRIMARY KEY (`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `student_account` (
    `username` VARCHAR(15) NOT NULL,
    `student_id` INT(6) NOT NULL,
    FOREIGN KEY (`username`) REFERENCES `groupee`.`account`(`username`),
    FOREIGN KEY (`student_id`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `professor` (
    `id` INT(6) UNIQUE NOT NULL,
    `username` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`),
    FOREIGN KEY (`username`) REFERENCES `groupee`.`account`(`username`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `course` (
    `course_id` INT(4) NOT NULL,
    `course_name` VARCHAR(6) NOT NULL,
    `instructor_id` INT(6) NOT NULL,
    
    PRIMARY KEY (`course_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `classlist` (
    `course_id` INT(4) NOT NULL,
    `section_size` INT(3),
    `student_id` INT(6) NOT NULL,

    FOREIGN KEY (`course_id`) REFERENCES `groupee`.`course`(`course_id`),
    FOREIGN KEY (`student_id`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`. `group_request` (
    `requester_id` INT(6) UNIQUE,
    `requested_members` INT(6),
    `availability` VARCHAR(54) NOT NULL,
    `size` INT NOT NULL,

    FOREIGN KEY (`requester_id`) REFERENCES `groupee`.`student`(`student_id`),
    FOREIGN KEY (`requested_members`) REFERENCES `groupee`.`student`(`student_id`)
);

CREATE TABLE IF NOT EXISTS `groupee`.`group` (
    `group_no` INT(3) NOT NULL AUTO_INCREMENT,
    `group_name` VARCHAR(54) NOT NULL,
    `project_topic` VARCHAR(54),
    `grade` VARCHAR(2),

    PRIMARY KEY (`group_no`)
);

CREATE TABLE IF NOT EXISTS `groupee`.`members` (
    `group_no` INT(3),
    `member_id` INT(6) UNIQUE,

    FOREIGN KEY (`group_no`) REFERENCES `groupee`.`group`(`group_no`),
    FOREIGN KEY (`member_id`) REFERENCES `groupee`.`student`(`student_id`)
);

INSERT IGNORE INTO `groupee`.`student` (`student_id`, `section_no`, `major`, `first_name`, `middle_name`, `last_name`)
VALUES (111111, 2, 'CS', 'Student1_First', NULL, 'Student1_Last'),
       (222222, 2, 'CS', 'Student2_First', NULL, 'Student2_Last'),
       (333333, 2, 'CS', 'Student3_First', NULL, 'Student3_Last'),
       (444444, 1, 'CS', 'Student4_First', NULL, 'Student4_Last'),
       (555555, 1, 'CS', 'Student5_First', NULL, 'Student5_Last'),
       (666666, 1, 'CS', 'Student6_First', NULL, 'Student6_Last');

INSERT IGNORE INTO `groupee`.`account` (`username`, `password`, `first_name`, `middle_name`, `last_name`)
VALUES ('S1_user', 'password', 'Student1_First', NULL, 'Student1_Last'),
       ('S3_user', 'password', 'Student3_First', NULL, 'Student3_Last'),
       ('S5_user', 'password', 'Student5_First', NULL, 'Student5_Last'),
       ('Prof1_user', 'password', 'Prof1_First', NULL, 'Prof1_Last'),
       ('Prof2_user', 'password', 'Prof2_First', NULL, 'Prof2_Last');

INSERT IGNORE INTO `groupee`. `student_account` (`username`, `student_id`)
VALUES ('S1_user', 111111),
       ('S3_user', 333333),
       ('S5_user', 555555);

INSERT IGNORE INTO `groupee`. `professor` (`id`, `username`)
VALUES (999999, 'Prof1_user'),
       (888888, 'Prof2_user');