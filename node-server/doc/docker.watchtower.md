# SETUP DOCKER WATCHTOWER

## What for? 
Docker Watchtower catches event when image on docker hub has been updated, automatically fetching and rebuild image in local (or system in server)


## Setup
- `sudo docker run -d --name watchtower -e WATCHTOWER_TRACE=true -e WATCHTOWER_DEBUG=true -e WATCHTOWER_POLL_INTERVAL=50 -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower` + `name container`
- build image: `sudo docker-compose -f docker-compose.yml -f docker-compose.product.yml build "services-name"`
- push image to docker hub: `sudo docker-compose -f docker-compose.yml -f docker-compose.product.yml push "services-name"`