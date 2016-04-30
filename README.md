# widukind-spa

#### Getting started

1. Install all dependencies
  * `npm install`
2. Pack the JS bundle
  * `webpack`
3. Start the server
  * `npm start`

#### Docker

1. Clone this project
  * `git clone https://github.com/mgouault/widukind-spa.git`
  * `cd widukind-spa`

1. Build image
  * `docker build -t widukind-spa .`

2. Run a container
  * `docker run -d --name spa -p 3000:3000 widukind-spa`

3. Open browser
  * `http://YOUR_PUBLIC_IP:3000`
