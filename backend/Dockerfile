FROM node:20-alpine
WORKDIR /app

# Enable Corepack and pnpm
RUN corepack enable

# Install dependencies (dev + prod) for local development using pnpm
COPY package*.json ./
RUN pnpm install

# Copy source
COPY tsconfig.json ./
COPY src ./src

ENV PORT=5000
EXPOSE 5000

# Default command runs dev server (ts-node-dev)
CMD ["pnpm", "dev"]
