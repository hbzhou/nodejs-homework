create table if not exists users
(
    id INT PRIMARY KEY not null,
    login TEXT NOT NULL,
    password TEXT NOT NULL,
    age TINYINT NOT NULL,
    isDelete TINYINT NOT NULL
)


