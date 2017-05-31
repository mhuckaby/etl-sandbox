SELECT
	  etls_activity.id 					as 'activity_id',
    etls_activity.source_user as 'source_user_id',
    etls_activity.target_user as 'target_user_id',
    etls_activity.action 			as 'action',
	  eu_source.username 		    as 'source_username',
    eu_source.uuid 				    as 'source_user_uuid',
    eu_target.username 		    as 'target_username',
    eu_target.uuid 				    as 'target_user_uuid'
FROM
	  etls.etls_activity,
    etls.etls_user eu_source,
    etls.etls_user eu_target
WHERE
	  etls.etls_activity.source_user = eu_source.id
AND
    etls.etls_activity.target_user = eu_target.id