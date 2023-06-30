CREATE TABLE reserves (
  id VARCHAR(255) NOT NULL,
  eventId INT(11) NOT NULL,
  seats JSON NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (eventId) REFERENCES events(id)
);
