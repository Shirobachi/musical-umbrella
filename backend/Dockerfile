FROM node:16

# Create app directory
RUN mkdir -p /app
WORKDIR /app

# Install app dependencies
COPY package.json /app/
RUN npm install

# Bundle app source
COPY . /app

RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY zsuvwhrirn2mbbh
ENV PM2_SECRET_KEY txgb3wvivqpapg5

EXPOSE 3001
CMD ["pm2-runtime", "app.js"]