# widukind-spa

Taiga project - kanban board:
https://tree.taiga.io/project/mgouault-widukind-spa/kanban

#### Run in Docker

1. Run a container

```bash
$ docker run -d --name widukind-spa \
  -p YOUR_PUBLIC_IP:3000:80 \
  -e ROOT_URL=http://YOUR_PUBLIC_IP:3000 \
  -e MONGO_URL=mongodb://mongodb/widukind \
  mgouault/widukind-spa
```

2. Open browser
  * `http://YOUR_PUBLIC_IP:3000`
