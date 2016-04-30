FROM node:4

ENV PORT 3000

WORKDIR /src

ADD . /src/

RUN npm install -g webpack \
    && npm install \
    && webpack

EXPOSE 3000

CMD ["node", "server.js"]
