# Build React app
FROM node:18 AS builder

# Goes to the app directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install app dependecny
RUN npm install

# copy rest of the app to the container
COPY . .

# set port environment variable
ENV PORT=9000

# expose the port so computer can access
EXPOSE 9000

# run the app
CMD ["npm","run","dev"]
