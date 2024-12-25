
## Deploy

```sh
rsync -av --exclude='node_modules' --exclude='.git' ./ lorange:~/fastify-hello-world/
```

```sh
ssh lorange
cd ~/fastify-hello-world
npm install
```

Run:

```sh
npm start
```
