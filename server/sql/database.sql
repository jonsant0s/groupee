CREATE TABLE IF NOT EXISTS `groupee`. `account` (
    `username` VARCHAR(15) UNIQUE NOT NULL,
    `password` VARCHAR(15) NOT NULL,
    `first_name` VARCHAR(54) NOT NULL,
    `middle_name` VARCHAR(54),
    `last_name` VARCHAR(54) NOT NULL,
    PRIMARY KEY (`username`)
);