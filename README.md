# Fastify Hello World Benchmark

This is a simple Fastify (Node.js) web app that returns "Hello, World!" response, made for benchmarking performance and resource usage and comparing it with [Axum (Rust)](https://github.com/evgenyneu/axum-hello-world) benchmark.

## Build

```sh
npm install
```

Run:

```sh
npm start
```

## Deploy

Copy files:

```sh
rsync -av --exclude='node_modules' --exclude='.git' ./ lorange:~/fastify-hello-world/
```

Install dependencies:

```sh
ssh lorange
cd ~/fastify-hello-world
npm install
```

Run with one node process:

```sh
npm start
```

Run with clustering (utilize all CPU cores):

```sh
node cluster.js
```

## Benchmarking


### After reboot

* RAM usage:
* CPU Load average (over 1 minute):

### Server running idle

* Single node process: `npm start`:

* RAM usage:
* CPU Load average (over 1 minute):

Clustering (utilize all CPU cores): `node cluster.js`:

* RAM usage:
* CPU Load average (over 1 minute):

### Stress test #1

With one node process: `npm start`

```sh
wrk -t10 -c1000 -d600s http://192.168.20.25:3000/
```

* RAM usage:
* CPU Load average (over 1 minutes):

Results:

```

```

### Stress test #2 (six processes)

Six Node.js processes: `node cluster.js`

```sh
wrk -t10 -c1000 -d600s http://192.168.20.25:3000/
```

* RAM usage:
* CPU Load average (over 1 minute):

Results:

```

```


### Stress test #3 (eight processes)

Eight Node.js processes: `node cluster.js`

```sh
wrk -t10 -c1000 -d600s http://192.168.20.25:3000/
```

* RAM usage:
* CPU Load average (over 1 minute):

Results:

```

```


## Hardware

The web server was run on Orange Pi 5 Max with 16 GB RAM and 1 TB NVMe SSD running Ubuntu 24.04 LTS, Node.js v22.12.0. The `wrk` benchmark command was run on a Desktop PC (12600K, 32 GB RAM), running Ubuntu 24.04 LTS. Both machines were connected to NetComm NF18ACV router via 1 Gbps Ethernet cables.

## Server response

```sh
curl -v http://192.168.20.25:3000/
*   Trying 192.168.20.25:3000...
* Connected to 192.168.20.25 (192.168.20.25) port 3000
> GET / HTTP/1.1
> Host: 192.168.20.25:3000
> User-Agent: curl/8.5.0
> Accept: */*
>
< HTTP/1.1 200 OK
< x-filler: xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
< content-type: text/plain; charset=utf-8
< content-length: 13
< Date: Wed, 25 Dec 2024 20:55:05 GMT
< Connection: keep-alive
< Keep-Alive: timeout=72
<
* Connection #0 to host 192.168.20.25 left intact
Hello, World!
```

Response size:

```sh
curl -s -o /dev/null -w "%{size_download}\n%{size_header}\n" http://192.168.20.25:3000/
13
244
```
