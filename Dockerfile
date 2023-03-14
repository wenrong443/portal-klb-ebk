FROM node:16.13-alpine3.12

# RUN apk add --update --no-cache curl py-pip
# RUN apk add build-base
# install simple http server for serving static content
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy both 'package.json' and 'package-lock.json' (if available)
COPY package*.json ./
# RUN npm install --save --legacy-peer-deps
# RUN npm config set legacy-peer-deps true
# # install project dependencies
# RUN npm install

# copy project files and folders to the current working directory (i.e. 'app' folder)
COPY dist .

# build app for production with minification
# RUN npm run build:dev

EXPOSE 8080
CMD [ "http-server", "dist" ]