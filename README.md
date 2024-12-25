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

* RAM usage: 238M
* CPU Load average (over 1 minute): 0.07

### Server running idle

* Single node process: `npm start`:

* RAM usage: 275M
* CPU Load average (over 1 minute): 0.05

Clustering (utilize all CPU cores): `node cluster.js`:

* RAM usage: 410M
* CPU Load average (over 1 minute): 0.00

### Stress test #1

With one node process: `npm start`

```sh
wrk -t10 -c1000 -d600s http://192.168.20.25:3000/
```

* RAM usage: 317M
* CPU Load average (over 1 minutes): 1.23

Results:

```
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency   101.21ms   15.83ms   1.98s    94.19%
    Req/Sec     0.97k   141.74     3.95k    93.70%
  5768476 requests in 10.00m, 1.38GB read
  Socket errors: connect 0, read 0, write 0, timeout 795
Requests/sec:   9612.71
Transfer/sec:      2.36MB
```


### Stress test #2 (three processes)

Six Node.js processes: `node cluster.js`

```sh
wrk -t10 -c1000 -d600s http://192.168.20.25:3000/
```

* RAM usage: 422M
* CPU Load average (over 1 minute): 3.57

Results:

```
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    33.39ms   18.33ms   1.99s    99.48%
    Req/Sec     3.03k   262.21     7.10k    88.38%
  18054769 requests in 10.00m, 4.32GB read
  Socket errors: connect 0, read 0, write 0, timeout 577
Requests/sec:  30086.82
Transfer/sec:      7.37MB
```

### Stress test #3 (four processes)

Six Node.js processes: `node cluster.js`

```sh
wrk -t10 -c1000 -d600s http://192.168.20.25:3000/
```

* RAM usage: 450M
* CPU Load average (over 1 minute): 4.82

Results:

```
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    30.88ms   36.53ms   1.99s    96.25%
    Req/Sec     3.84k   453.06    16.00k    79.88%
  22882405 requests in 10.00m, 5.48GB read
  Socket errors: connect 0, read 0, write 0, timeout 465
Requests/sec:  38133.55
Transfer/sec:      9.35MB
```


### Stress test #4 (six processes)

Six Node.js processes: `node cluster.js`

```sh
wrk -t10 -c1000 -d600s http://192.168.20.25:3000/
```

* RAM usage: 546M
* CPU Load average (over 1 minute): 6.62

Results:

```
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    33.75ms   47.46ms   1.89s    96.96%
    Req/Sec     3.48k   395.30    11.27k    78.28%
  20753578 requests in 10.00m, 4.97GB read
Requests/sec:  34584.33
Transfer/sec:      8.48MB
```


### Stress test #5 (eight processes)

Eight Node.js processes: `node cluster.js`

```sh
wrk -t10 -c1000 -d600s http://192.168.20.25:3000/
```

* RAM usage: 638M
* CPU Load average (over 1 minute): 8.47

Results:

```
Running 10m test @ http://192.168.20.25:3000/
  10 threads and 1000 connections
  Thread Stats   Avg      Stdev     Max   +/- Stdev
    Latency    37.02ms   40.97ms   2.00s    95.90%
    Req/Sec     3.17k   389.96     5.57k    77.40%
  18904005 requests in 10.00m, 4.52GB read
  Socket errors: connect 0, read 0, write 0, timeout 245
Requests/sec:  31501.44
Transfer/sec:      7.72MB
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
