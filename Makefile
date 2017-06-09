.PHONEY: help set-env init update plan plan-destroy show graph apply decrypt

DOCKER_COMMAND_CHECK=$(shell which docker > /dev/null 2>&1 ; echo $$? )

DOCKER_TAG?="0.0.13"


help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'


requirements_check:
ifeq ($(DOCKER_COMMAND_CHECK), 1)
	$(error The command 'docker' cannot be found in your path. Please visit https://www.docker.com for help installing')
endif


docker_tag: requirements_check ## View the current tag value that will be applied to built docker image
	@echo "Current tag value is $(DOCKER_TAG)"

docker_build: docker_tag requirements_check ## Build the docker image
	@echo "using tag value $(DOCKER_TAG)" && cd app && docker build --force-rm --no-cache -t mhuckaby/etls:$(DOCKER_TAG) .

docker_clean: requirements_check ## Removes etls docker image
	-@docker rmi -f $(docker images | grep mhuckaby/etls | awk '{print $3}') > /dev/null 2>&1

docker_push: requirements_check ## Push the docker image to DockerHub
	@cd app && docker build --force-rm --no-cache -t mhuckaby/etls:$(DOCKER_TAG) . && docker push mhuckaby/etls:$(DOCKER_TAG)

docker_compose: docker_tag ## Update compose yml with current tag
	@cd docker && ./docker-compose.yml.template.sh $(DOCKER_TAG) > docker-compose.yml

docker_deploy: docker_tag docker_clean ## Cleans and then deploys stack
	@cd docker && docker stack deploy -c docker-compose.yml etls