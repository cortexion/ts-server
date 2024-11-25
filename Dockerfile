# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Install PM2 globally for process management
RUN npm install -g pm2

# Copy the rest of the application code
COPY . .

# Build the TypeScript files
RUN npm run build

# Expose the port the app will run on
EXPOSE 80

# Command to run the application using PM2 to watch the dist/index.js file
CMD ["pm2-runtime", "start", "dist/index.js", "--name", "my-app", "--watch"]