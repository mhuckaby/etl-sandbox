MERGE (s: User { username: $source_username, id: $source_user_id, uuid: $source_user_uuid })
MERGE (t: User { username: $target_username, id: $target_user_id, uuid: $target_user_uuid })
CREATE (s)-[r: Transfer { id: $activity_id, type: $action, amount: $detail }]->(t);