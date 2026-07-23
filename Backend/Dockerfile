FROM node:22-bookworm

WORKDIR /app

# Install git (required for cloning repos into codespaces)
RUN apt-get update && apt-get install -y git && rm -rf /var/lib/apt/lists/*

# Copy package files and install dependencies
COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install --no-audit --no-fund

# Copy source code and Prisma schema
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Expose backend port
EXPOSE 3000

# Start the application - push db changes first then start
CMD npx prisma db push && npm start
