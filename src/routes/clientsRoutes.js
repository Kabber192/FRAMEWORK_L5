const ClientsController = require('../controllers/clientsController');
const { parseBody } = require('../middlewares/bodyParser');

const handleRequest = (req, res) => {
  const { method, url } = req;
  const idMatch = url.match(/^\/api\/v1\/clients\/(\d+)$/);
  const baseUrl = '/api/v1/clients';

  if (method === 'GET' && url === baseUrl) {
    return ClientsController.getAll(req, res);
  }

  if (method === 'GET' && idMatch) {
    return ClientsController.getById(req, res, idMatch[1]);
  }

  if (method === 'POST' && url === baseUrl) {
    return parseBody(req, err => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      ClientsController.create(req, res);
    });
  }

  if (method === 'PUT' && idMatch) {
    return parseBody(req, err => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      ClientsController.update(req, res, idMatch[1]);
    });
  }

  if (method === 'PATCH' && idMatch) {
    return parseBody(req, err => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      ClientsController.patch(req, res, idMatch[1]);
    });
  }

  if (method === 'DELETE' && idMatch) {
    return ClientsController.delete(req, res, idMatch[1]);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
};

module.exports = { handleRequest };