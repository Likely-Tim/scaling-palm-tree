FROM node:24-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and lock file first (to leverage caching)
COPY package.json package-lock.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy the rest of the application
COPY . .

# Start the application
CMD ["npm", "run", "start"]