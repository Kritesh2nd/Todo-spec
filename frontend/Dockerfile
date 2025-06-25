# Use a lightweight Node image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the project
COPY . .

# Expose the Vite dev server port
EXPOSE 5173

# Set environment (optional)
ENV HOST=0.0.0.0

# Start Vite dev server
CMD ["npm", "run", "dev"]
