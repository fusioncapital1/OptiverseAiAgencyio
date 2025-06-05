# ---- Build Stage ----
# Use an official Node.js runtime as a parent image for the build stage
# You might want to adjust the Node.js version to match what your project uses (e.g., node:18, node:20)
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if you use Yarn)
# This step is separated to leverage Docker's build cache
COPY package*.json ./

# Install project dependencies
# If you use yarn, change 'npm install' to 'yarn install --frozen-lockfile'
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Run the build script defined in your package.json
# This usually creates a 'build' or 'dist' folder with static assets
RUN npm run build

# ---- Serve Stage ----
# Use an official Nginx image to serve the static files
FROM nginx:1.25-alpine

# Set working directory for Nginx
WORKDIR /usr/share/nginx/html

# Remove default Nginx static assets
RUN rm -rf ./*

# Copy static assets from the 'builder' stage
# IMPORTANT: Adjust '/usr/src/app/build' if your build script outputs to a different directory (e.g., 'dist')
COPY --from=builder /usr/src/app/build .

# Expose port 80 for Nginx
EXPOSE 80

# Command to run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
