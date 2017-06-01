#!/usr/bin/env bash

docker_build_tag=`cat docker-image.tag`
echo "docker_build_tag: $docker_build_tag"
docker build --force-rm --no-cache -t mhuckaby/etls:$docker_build_tag .