# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app


# Copy package.json and package-lock.json first (for caching layers)
COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN chmod -R 755 /app

CMD ["node", "server.js"]
