# Stage 1: Build the TypeScript app
FROM node:16 AS deps

# Set the working directory
WORKDIR /usr/src/app

# Install app dependencies by copying package.json and package-lock.json
COPY package*.json ./

# Install only the production dependencies
RUN npm install --production

# Copy local code to the container
COPY . .

FROM node:16 AS build

WORKDIR /usr/src/app

# Install app dependencies by copying package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

# Build the TypeScript code
RUN npm run build

# Stage 2: Run the built app
FROM node:16

# Set the working directory
WORKDIR /usr/src/app

# Copy the built app from the build stage
COPY --from=build /usr/src/app/dist ./dist
COPY --from=deps /usr/src/app/node_modules ./node_modules

EXPOSE 3000

# Specify the command to run on container start
CMD [ "node", "dist/src/server.js" ]