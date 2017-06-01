DROP TABLE IF EXISTS etls_activity
DROP TABLE IF EXISTS etls_fund_source;
DROP TABLE IF EXISTS etls_user;
DROP TABLE IF EXISTS etls_activity_lookup;
DROP TABLE IF EXISTS etls_fund_source_lookup;


# Users
CREATE TABLE etls_user (id BIGINT NOT NULL AUTO_INCREMENT, uuid VARCHAR(36), username VARCHAR(20), PRIMARY KEY(id));

# Activity
CREATE TABLE etls_activity (id BIGINT NOT NULL AUTO_INCREMENT, source_user BIGINT NOT NULL, target_user BIGINT, target_fund_source BIGINT, activity_type BIGINT NOT NULL, detail VARCHAR(140), PRIMARY KEY(id));

# Activity Type Lookup
CREATE TABLE etls_activity_lookup (id BIGINT NOT NULL, atype VARCHAR(45), description VARCHAR(100), PRIMARY KEY(id));

# Funding Source Type Lookup
CREATE TABLE etls_fund_source_lookup (id BIGINT NOT NULL, ftype VARCHAR(45), description VARCHAR(30), PRIMARY KEY(id));

# Funding Source
CREATE TABLE etls_fund_source (id BIGINT NOT NULL, user BIGINT NOT NULL, ftype BIGINT NOT NULL, PRIMARY KEY(id), FOREIGN KEY(user) REFERENCES etls_user(ID), FOREIGN KEY(ftype) REFERENCES etls_fund_source_lookup(id));


# Funding Source Type Lookup Data
INSERT INTO etls_fund_source_lookup (id, ftype, description) VALUES (1, "checking", "Checking Account");
INSERT INTO etls_fund_source_lookup (id, ftype, description) VALUES (2, "credit", "Credit Card");

# Activity Type Lookup Data
INSERT INTO etls_activity_lookup (id, atype, description) VALUES (1, "message", "User sends a message to another user");
INSERT INTO etls_activity_lookup (id, atype, description) VALUES (2, "funds_transfer", "User sends funds to another user");
INSERT INTO etls_activity_lookup (id, atype, description) VALUES (3, "funds_widthdrawal", "User removes funds from system");

# User Data
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Adam");   # 1
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Ben");    # 2
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Carl");   # 3
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Derik");  # 4
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Eric");   # 5
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Frank");  # 6
INSERT INTO etls_user (uuid, username) VALUES (uuid(), "Gary");   # 7

# Funding Source Data
INSERT INTO etls_fund_source (id, user, ftype) VALUES (1, 1, 1); # Adam account
INSERT INTO etls_fund_source (id, user, ftype) VALUES (2, 7, 1); # Garys account
INSERT INTO etls_fund_source (id, user, ftype) VALUES (3, 2, 1); # Mortys account

# Activity Data

# Message Data
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 2, 1, "hey ben");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 2, 1, "you there, ben?");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 3, 1, "howdy carl");

INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (2, 1, 1, "where to");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (2, 1, 1, "message 2");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (3, 1, 1, "get out of my garage");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (4, 1, 1, "hi dad");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (5, 1, 1, "hi grandpa");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (6, 1, 1, "ugh");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (7, 1, 1, "yt?");

INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (4, 5, 1, "hi.");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (5, 6, 1, "oh hey");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (6, 7, 1, "yo");
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (7, 4, 1, "ktb");

# Transfer Data
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 2, 2, "$5.00"); # Adam to Ben

INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 3, 2, "$5.00"); # Adam to Carl
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (2, 3, 2, "$5.00"); # Ben to Carl

INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 4, 2, "$5.00"); # Adam to Derik

INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 5, 2, "$5.00");  # Adam to Eric
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (4, 5, 2, "$15.00"); # Derik to Eric

INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 6, 2, "$5.00");  # Adam to Frank
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (5, 6, 2, "$20.00"); # Eric to Frank

INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (1, 7, 2, "$5.00");  # Adam to Gary
INSERT INTO etls_activity (source_user, target_user, activity_type, detail) VALUES (6, 7, 2, "$25.00"); # Frank to Gary

# Withdrawal Data
INSERT INTO etls_activity (source_user, target_fund_source, activity_type, detail) VALUES (7, 2, 3, "$30.00");
INSERT INTO etls_activity (source_user, target_fund_source, activity_type, detail) VALUES (2, 3, 3, "$2.50");
INSERT INTO etls_activity (source_user, target_fund_source, activity_type, detail) VALUES (2, 3, 3, "$2.50");
