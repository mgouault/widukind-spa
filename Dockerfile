FROM node:4

ENV PORT 3000

WORKDIR /src

ADD . /src/

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]
