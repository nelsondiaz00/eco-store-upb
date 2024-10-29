FROM node:latest
RUN mkdir -p /home/app
EXPOSE 1802
WORKDIR /home/app
COPY ./package.json /home/app/package.json
COPY ./env/.devp.env /home/app/env/.pro.env
RUN npm install
COPY . /home/app
RUN npm run build
CMD [ "npm", "start" ]
