MERGE (u1: User { username: $source_username, id: $source_user_id, uuid: $source_user_uuid })
MERGE (u2: User { username: $target_username, id: $target_user_id, uuid: $target_user_uuid })
CREATE (u1)-[r: Action { id: $activity_id, type: $action }]->(u2);