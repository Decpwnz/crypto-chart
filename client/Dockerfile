# Stage 1: Build the application
FROM node:18-alpine as build

# Set the working directory inside the container to /app
WORKDIR /app

# Copy package.json to the /app directory in the container
COPY package.json .

# Install dependencies specified in the package.json file
RUN yarn install

# Copy all files and folders from the current directory to the /app directory in the container
COPY . .

# Build the application
RUN yarn build

# Stage 2: Create a lightweight production image
FROM nginx:alpine

# Create a non-root user and a group with UID/GID 1001
RUN addgroup -g 1001 -S appuser && \
    adduser -u 1001 -S appuser -G appuser

# Create an empty nginx.pid file and change its ownership to appuser
RUN touch /run/nginx.pid && \
    chown -R appuser:appuser /run/nginx.pid var/cache/nginx

# Set user for running the application
USER appuser

# Copy the built application to the Nginx HTML directory
COPY --from=build --chown=appuser:appuser /app/dist /usr/share/nginx/html

# Copy the custom nginx.conf file to the Nginx configuration directory
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080
EXPOSE 8080

# Start Nginx with the "daemon off;" directive
CMD ["nginx", "-g", "daemon off;"]
