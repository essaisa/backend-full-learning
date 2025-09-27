# Use an official Node.js runtime
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package files first (to leverage caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Expose the port your app runs on
EXPOSE 5003

# Start the app
CMD ["node", "./src/server.js"]