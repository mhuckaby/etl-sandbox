DROP TABLE IF EXISTS etls_activity
DROP TABLE IF EXISTS etls_user;


CREATE TABLE etls_user (id BIGINT NOT NULL AUTO_INCREMENT, uuid VARCHAR(36), username VARCHAR(20), PRIMARY KEY(id));

INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Rick");              # 1
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Morty");             # 2
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Jerry");             # 3
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Beth");              # 4
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Summer");            # 5
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Mr. Meeseeks");      # 6
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Bird Person");       # 7


CREATE TABLE etls_activity (id BIGINT NOT NULL AUTO_INCREMENT, source_user BIGINT NOT NULL, target_user BIGINT, action VARCHAR(20) NOT NULL, detail VARCHAR(140), PRIMARY KEY(id));

# Messages
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 2, "message", "gazorp");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 2, "message", "hey");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 3, "message", "howdy");

INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (2, 1, "message", "where to");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (2, 1, "message", "message 2");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (3, 1, "message", "get out of my garage");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (4, 1, "message", "hi dad");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (5, 1, "message", "hi grandpa");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (6, 1, "message", "ugh");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (7, 1, "message", "yt?");

INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (4, 5, "message", "hi.");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (5, 6, "message", "oh hey");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (6, 7, "message", "yo");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (7, 4, "message", "ktb");

# Transfers
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 2, "funds_transfer", "$5.00");

INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 3, "funds_transfer", "$5.00");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (2, 3, "funds_transfer", "$5.00");

INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 4, "funds_transfer", "$5.00");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (3, 4, "funds_transfer", "$10.00");

INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 5, "funds_transfer", "$5.00");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (4, 5, "funds_transfer", "$15.00");

INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 6, "funds_transfer", "$5.00");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (5, 6, "funds_transfer", "$20.00");

INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (1, 7, "funds_transfer", "$5.00");
INSERT INTO etls_activity (source_user, target_user, action, detail) VALUES (6, 7, "funds_transfer", "$25.00");

INSERT INTO etls_activity (source_user, action, detail) VALUES (7, "funds_widthdrawal", "$30.00");
