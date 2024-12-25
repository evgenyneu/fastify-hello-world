const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const path = require('path');
const Fastify = require('fastify');

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  console.log(`Launching ${numCPUs} workers`);

  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Run the Fastify app
  process.env.NODE_ENV = 'production';

  const start = async () => {
    try {
      const app = Fastify();
      app.register(require('./app.js'));

      await app.listen({ port: 3000, host: '0.0.0.0' });
      console.log(`Worker ${process.pid} started and listening on ${app.server.address().port}`);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  };

  start();
}
