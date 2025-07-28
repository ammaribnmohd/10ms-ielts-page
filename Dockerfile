# 1. Use an official Node.js runtime as the base image.
# We use the 'alpine' version for a smaller image size.
FROM node:20-alpine

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy package.json and package-lock.json (or other lock files)
# This is a Docker optimization. It only re-installs dependencies if these files change.
COPY package*.json ./

# 4. Install project dependencies
RUN npm install

# 5. Copy the rest of your application code into the container
COPY . .

# 6. Build your Next.js application for production
RUN npm run build

# 7. Expose the port the app runs on
EXPOSE 3000

# 8. The command to run when the container starts
CMD ["npm", "start"]
