# ARG NODE_SERVER_ENV
ARG PORT

FROM node:18-slim

# ENV NODE_ENV ${NODE_SERVER_ENV}

ENV TZ="Asia/Dhaka"

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json .

RUN npm install

RUN npm install pm2 -g

# Bundle app source
COPY . .

EXPOSE ${PORT}

# RUN chown -R node /usr/src/app

# USER node

# ENTRYPOINT [ "/usr/src/app/run-server.sh" ]
CMD ["npm","run","dev"]
