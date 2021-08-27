FROM node:15
USER root
# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Update package 
# RUN apt-get update
# RUN apt-get -y install curl gnupg
# RUN curl -sL https://deb.nodesource.com/setup_11.x  | bash -
# RUN apt-get -y install nodejs

# Install app dependencies
COPY package.json /usr/src/app/

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

# Bundle app source
COPY . /usr/src/app

ENV PORT 3000
EXPOSE ${PORT}
CMD [ "npm", "start"]