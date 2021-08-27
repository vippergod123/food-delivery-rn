1. Create Dockerfile
2. Write cmd in Dockerfile
3. run "sudo docker build -t app-image-name ."
4. create conteiner "sudo docker run -d --name appname app-image-name" || sudo docker run -p red-port:yellow-port -d --name node-server node-sever-image ![alt text](../doc/images/Screenshot%20from%202021-08-24%2023-07-28.png)
5. sudo docker run -v pathToFolderOnLocation:pathToLocationOnContainer:[options] -p 3000:3000 -d --name node-app node-app-image
   - Ex: `sudo docker run -v $PWD:/user/src/app -p 3000:3000 -d --name node-server node-server-image`
   - options: ro (read-only), etc...

* -v "folder" to prevent overwrite to that folder or file in container 
* `docker logs container-name` to log message or error while running docker
* `printenv`: show env 
* `rm -fv` delete container and its volumes

# Using docker compose
1. Create file `docker-compose.yml`
2. Run `docker-compose up -d`
   - `up -d --build` tell docker update or rebuild image 
3. stop `docker-compose down -v`
4. sudo docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --scale node-server=2
   - `--scale node-server=2` to run 2 instances of node-server (or any image) 

