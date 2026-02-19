FROM node:20-slim

# Install ffmpeg for audio processing (Optional but recommended for later)
RUN apt-get update && apt-get install -y ffmpeg && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package info and install
COPY package*.json ./
RUN npm install --production

# Note: We need @google/generative-ai and other bridge deps
RUN npm install express body-parser axios form-data dotenv js-yaml @google/generative-ai

# Copy source code
COPY . .

# Expose the webhook port
EXPOSE 3000

# Start the server
CMD ["node", "scripts/server.js"]
