const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const path = require('path');
const { spawn } = require('child_process');

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
  // Run using fastify-cli
  process.env.NODE_ENV = 'production';

  const fastifyBin = path.join(__dirname, 'node_modules', '.bin', 'fastify');
  const args = ['start', '-l', 'silent', '-a', '0.0.0.0', 'app.js'];

  spawn(fastifyBin, args, { stdio: 'inherit' });
}
