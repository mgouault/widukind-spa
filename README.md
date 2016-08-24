# widukind-spa

Taiga project - kanban board:
https://tree.taiga.io/project/mgouault-widukind-spa/kanban

#### Getting started

1. Install all dependencies
  * `meteor npm install`
3. Start the server
  * `meteor npm start`

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
