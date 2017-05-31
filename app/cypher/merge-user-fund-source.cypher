MERGE (u: User { username: $source_username, id: $source_user_id, uuid: $source_user_uuid })
MERGE (f: Fund { description: $fund_type_description, type: $fund_type, id: $fund_source_id, owner: $source_user_id })
CREATE (u)-[r: Action { id: $activity_id, type: $action, detail: $detail }]->(f);