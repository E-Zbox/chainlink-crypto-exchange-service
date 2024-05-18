ARG NODE_VERSION=20.9.0
FROM node:${NODE_VERSION}-alpine AS production
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
