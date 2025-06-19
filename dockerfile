# ---------- Stage 1: Build ----------
    FROM node:18-alpine AS builder

    WORKDIR /app
    
    # Copy package files và cài đặt dependencies
    COPY package*.json ./
    RUN npm ci --legacy-peer-deps --force
    
    # Cài đặt TypeScript global
    RUN npm install -g typescript
    
    # Copy source code và build
    COPY . .
    RUN npm run build:css && npm run build  # Build CSS trước
    
    # ---------- Stage 2: Production ----------
    FROM nginx:alpine
    
    # Copy file build từ stage builder
    COPY --from=builder /app/dist /usr/share/nginx/html
    
    # Cấu hình Nginx
    COPY ./nginx.conf /etc/nginx/conf.d/default.conf
    
    EXPOSE 5173
    CMD ["nginx", "-g", "daemon off;"]