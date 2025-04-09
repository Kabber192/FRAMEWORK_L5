const AccountsController = require('../controllers/accountsController');
const { parseBody } = require('../middlewares/bodyParser');

const handleAccountsRequest = (req, res) => {
  const { method, url } = req;
  const idMatch = url.match(/^\/api\/v1\/accounts\/(\d+)$/);
  const baseUrl = '/api/v1/accounts';

  if (method === 'GET' && url === baseUrl) {
    return AccountsController.getAll(req, res);
  }

  if (method === 'GET' && idMatch) {
    return AccountsController.getById(req, res, idMatch[1]);
  }

  if (method === 'POST' && url === baseUrl) {
    return parseBody(req, err => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      AccountsController.create(req, res);
    });
  }

  if (method === 'PUT' && idMatch) {
    return parseBody(req, err => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      AccountsController.update(req, res, idMatch[1]);
    });
  }

  if (method === 'PATCH' && idMatch) {
    return parseBody(req, err => {
      if (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Invalid JSON' }));
        return;
      }
      AccountsController.patch(req, res, idMatch[1]);
    });
  }

  if (method === 'DELETE' && idMatch) {
    return AccountsController.delete(req, res, idMatch[1]);
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found' }));
};

module.exports = { handleAccountsRequest };