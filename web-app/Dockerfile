# this is pulling from Docker's repository. Node is an image, which is like an application running on the computer/ virtual machine. Build container off from the image. The container has more than just the image.
# DockerFile is to create individual containers
# start FROM a base layer of node v16.13
FROM node:16.13

# Set up a WORKDIR for application in the container
WORKDIR /usr/src/app

# COPY all of our application files tp the WORKDIR in the container
COPY . /usr/src/app


# npm install to create node-modules in the container
RUN npm install

# build for production
RUN npm run build

# EXPOSE server port in the container
EXPOSE 3001

# Start the server
ENTRYPOINT ["node", "./server/server.js"]

# -t is to tag 
# on terminal, docker build -t <org-name>/<repo-name> .
