# Docker runs from top down
# Use an official node.js runtime as a parent image
FROM node:22-alpine

# Set the working directory in the container
WORKDIR /app 

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy rest of the application code
COPY . .

# Expose the port that the app runs on
EXPOSE 5003

# Define the command to run the application
CMD ["node", "./src/server.js"]