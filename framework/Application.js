const EventEmitter = require("events");
const http = require("http");

class Framework {
  constructor() {
    this.server = this._createServer();
    this.emitter = new EventEmitter();
    this.middlewares = [];
  }

  listen(port, callback) {
    this.server.listen(port, callback);
  }

  use(middleware) {
    this.middlewares.push(middleware);
  }

  addRouter(router) {
    Object.keys(router.endpoints).forEach((path) => {
      const endpoint = router.endpoints[path];
      Object.keys(endpoint).forEach((method) => {
        this.emitter.on(this._getRouteMask(path, method), (req, res) => {
          const handler = endpoint[method];
          this._runMiddleware(req, res, () => handler(req, res));
        });
      });
    });
  }

  _createServer() {
    return http.createServer((req, res) => {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        if (body) req.body = JSON.parse(body);

        this._runMiddleware(req, res, () => {
          const emitted = this.emitter.emit(
            this._getRouteMask(req.url, req.method),
            req,
            res
          );

          if (!emitted) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Not Found\n');
          }
        });
      });
    });
  }

  _getRouteMask(path, method) {
    return `[${path}]:[${method}]`;
  }

  _runMiddleware(req, res, next) {
    let index = 0;

    const middlewareNext = () => {
      if (index < this.middlewares.length) {
        this.middlewares[index++](req, res, middlewareNext);
      } else {
        next();
      }
    };

    middlewareNext();
  }
}

module.exports = Framework;
