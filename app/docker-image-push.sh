#!/usr/bin/env bash

docker_build_tag=`cat docker-image.tag`
echo "docker_build_tag: $docker_build_tag"
docker tag mhuckaby/etls mhuckaby/etls:$docker_build_tag
docker push mhuckaby/etls:$docker_build_tag