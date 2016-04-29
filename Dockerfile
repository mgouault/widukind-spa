FROM debian

RUN apt-get update && apt-get install -y curl \
&& curl -sL https://deb.nodesource.com/setup_4.x | bash - \
&& apt-get update && apt-get install -y \
  nodejs \
  git \
  build-essential

RUN git clone https://github.com/mgouault/widukind-spa.git widukind-spa \
&& cd widukind-spa \
&& npm install -g webpack \
&& npm install \
&& webpack

CMD ["node", "widukind-spa/server.js"]

EXPOSE 3000
