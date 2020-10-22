FROM node:12-alpine as builder
WORKDIR /app
COPY package.json /app/package.json
RUN npm install
COPY . /app
EXPOSE 8080 
USER node
RUN npm run migrate
RUN npm run migrate:symbol
CMD ["node", "index.js"]
