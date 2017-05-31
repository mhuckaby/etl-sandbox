MERGE (u: User { username: $source_username, id: $source_user_id, uuid: $source_user_uuid })
MERGE (f: Fund { type: $fund_type, description: $fund_type_description, id: $fund_source_id, owner: $source_user_id })
CREATE (u)-[r: Withdrawal { id: $activity_id, type: $action, amount: $detail }]->(f);