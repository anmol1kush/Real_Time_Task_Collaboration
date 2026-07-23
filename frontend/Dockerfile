# Build stage
FROM node:22-bookworm AS build

WORKDIR /app

COPY package*.json ./
RUN npm config set registry https://registry.npmjs.org/ && npm install --no-audit --no-fund

COPY . .

# Pass backend URL at build time if needed (or configure nginx to proxy)
# ARG VITE_BACKEND_URL
# ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

# Serve stage
FROM nginx:alpine

# Copy built assets from build stage to nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom nginx config if necessary, or use default
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
