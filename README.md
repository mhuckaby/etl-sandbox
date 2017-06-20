# etl-sandbox
This project is a sandbox to demonstrate ETL between several types of data store.

Developed and tested using 

- Mac/OSX (Sierra 10.12.5) Docker version 17.03.1-ce, build c6d412e
- Ubuntu (Xenial) Docker version 17.03.1-ce, build c6d412e


## Starting the Data Store Containers

- Initialize the Docker swarm   
`docker swarm init`

- Start the Docker stack by first changing to the `docker` sub-diretory and running the following command from the root directory of this repository     
`docker stack deploy -c docker-compose.yml etls`

- Verify that the stack is up and running. It should report that etls stack is running 3 services   
`docker stack ls`

- View the processes in the stack   
`docker stack ps etls`

- Remove the stack when you are done     
`docker stack rm etls`


### Troubleshooting
The ElasticSearch instance may be thrashing up and down a bunch. You can determine the cause by attaching to the container and viewing the process output

`docker attach ${CONTAINER_ID_FROM_PS_COMMAND}`

On Ubuntu, if you find that the ElasticSearch instance is complaining about "max virtual memory areas vm.max_map_count", you can correct it with the following command

`sudo sysctl -w vm.max_map_count=262144`


## Data Store, Service, and Port Inventory
Once the containers have started, you will have the following services available

- ElasticSearch v.5.4.0 on port 9200
- MySql v.8.0.1on port 3600
- Neo4j v.3.2.0 on ports [7473, 7687]
- ETLS Basic Browser on ports [3000]

## MySql User names and Passwords
 
- MySql root password `root_etls`
- MySql database `etls`
- MySql database user `etls_user`
- MySql database user password `password`

## Quickstart

- Use make
