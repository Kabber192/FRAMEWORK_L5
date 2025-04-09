const ClientsService = require('../services/clientsService');

class ClientsController {
  async getAll(req, res) {
    const clients = await ClientsService.getAllClients();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(clients));
  }

  async getById(req, res, id) {
    const client = await ClientsService.getClientById(id);
    if (!client) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Client not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(client));
  }

  async create(req, res) {
    const client = await ClientsService.createClient(req.body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(client));
  }

  async update(req, res, id) {
    const updated = await ClientsService.updateClient(id, req.body);
    if (!updated) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Client not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updated));
  }

  async patch(req, res, id) {
    const updated = await ClientsService.patchClient(id, req.body);
    if (!updated) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Client not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updated));
  }

  async delete(req, res, id) {
    const deleted = await ClientsService.deleteClient(id);
    if (!deleted) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Client not found' }));
      return;
    }
    res.writeHead(204, {});
    res.end();
  }
}

module.exports = new ClientsController();