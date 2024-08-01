# Use the official Node.js image, based on the Alpine 3.20 distribution
FROM node:22.5.1-alpine3.20

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Expose port 8080 to allow external access to the application
EXPOSE 8080
