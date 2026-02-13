# Use specific Node version
FROM node:20

# Set environment
ENV NODE_ENV=production

# Create app directory
WORKDIR /usr/src/app

# Copy dependency files first (cache-friendly)
COPY package.json package-lock.json ./

# Install only production dependencies
RUN npm ci --omit=dev

# Copy app source
COPY . .

# Fix permissions and drop root
RUN chown -R node:node /usr/src/app
USER node

# App listens on this port
EXPOSE 7500

# Start app
CMD ["npm", "start"]
