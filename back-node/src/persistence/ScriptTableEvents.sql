CREATE TABLE events (
                        id INT AUTO_INCREMENT PRIMARY KEY,
                        name VARCHAR(255) NOT NULL,
                        date DATETIME NOT NULL,
                        price DECIMAL(10, 2) NOT NULL
);
