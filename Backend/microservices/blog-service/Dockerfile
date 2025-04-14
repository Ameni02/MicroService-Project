# base image
FROM node:18

# set working directory
WORKDIR /app

# install dependencies
COPY package*.json ./
RUN npm install

# copy source files
COPY . .

# expose port
EXPOSE 8085

# start the service
CMD ["node", "server.js"]
