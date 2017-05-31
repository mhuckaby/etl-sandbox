SELECT
  etls_activity.id 					          as 'activity_id',
  etls_activity.detail 			          as 'detail',
  etls_activity.source_user           as 'source_user_id',
  etls_activity.target_user           as 'target_user_id',
  etls_activity.activity_type         as 'activity_type',
  etls_activity_lookup.atype	        as 'action',
  etls_activity.target_fund_source    as 'fund_source_id',
  etls_fund_source.ftype              as 'fund_type',
  etls_fund_source_lookup.description as 'fund_type_description',
  eu_source.username 		    as 'source_username',
  eu_source.uuid 				    as 'source_user_uuid',
  eu_target.username 		    as 'target_username',
  eu_target.uuid 				    as 'target_user_uuid'
FROM
  etls.etls_activity
LEFT JOIN etls.etls_fund_source ON etls.etls_activity.target_fund_source = etls.etls_fund_source.id
LEFT JOIN etls.etls_activity_lookup ON etls.etls_activity.activity_type = etls.etls_activity_lookup.id
LEFT JOIN etls.etls_fund_source_lookup ON etls_fund_source.ftype = etls.etls_fund_source_lookup.id
LEFT JOIN etls.etls_user eu_source ON etls.etls_activity.source_user = eu_source.id
LEFT JOIN etls.etls_user eu_target ON etls.etls_activity.target_user = eu_target.id