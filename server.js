const http = require('http');
const { handleRequest } = require('./src/routes/clientsRoutes');
const { handleAccountsRequest } = require('./src/routes/accountsRoutes');
const { errorHandler } = require('./src/middlewares/errorHandler');

const server = http.createServer((req, res) => {
  try {
    if (req.url.startsWith('/api/v1/clients')) {
      handleRequest(req, res);
    } else if (req.url.startsWith('/api/v1/accounts')) {
      handleAccountsRequest(req, res);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found' }));
    }
  } catch (err) {
    errorHandler(err, res);
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});