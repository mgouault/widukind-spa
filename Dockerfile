FROM node:4

ENV PORT 3000

WORKDIR /src

ADD . /src/

RUN curl https://install.meteor.com/ | sh \
	&& meteor lint
	&& meteor npm install
	&& export LC_ALL=C.UTF-8
	&& export LANG=C

EXPOSE 3000

CMD ["meteor", "npm", "start"]
