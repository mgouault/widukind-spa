# widukind-spa

#### Getting started

1. Install all dependencies
  * `npm install`
2. Pack the JS bundle
  * `webpack`
3. Start the server
  * `npm start`

#### Docker

1. Build image
  * `docker build -q --tag="widukind-spa" .`

2. Run a container
  * `docker run -dP widukind-spa`

3. Find the published port
  * `docker ps -l`
