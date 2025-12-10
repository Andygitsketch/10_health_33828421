CREATE DATABASE IF NOT EXISTS body_frame_calculator;
USE body_frame_calculator;

CREATE TABLE IF NOT EXISTS measurements (
    id      INT AUTO_INCREMENT,
    wrist   DECIMAL(3),
    height  DECIMAL(3),
    result  DECIMAL(3, 2),
    PRIMARY KEY(id));


CREATE TABLE IF NOT EXISTS users(
    id          INT AUTO_INCREMENT,
    username    VARCHAR(50) UNIQUE,
    first_name  VARCHAR(50),
    last_name   VARCHAR(50),
    email       VARCHAR(100) UNIQUE,
    hashedPassword      VARCHAR(255),
    PRIMARY KEY(id));