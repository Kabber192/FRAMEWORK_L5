const AccountsService = require('../services/accountsService');

class AccountsController {
  async getAll(req, res) {
    const accounts = await AccountsService.getAllAccounts();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(accounts));
  }

  async getById(req, res, id) {
    const account = await AccountsService.getAccountById(id);
    if (!account) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Account not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(account));
  }

  async create(req, res) {
    const account = await AccountsService.createAccount(req.body);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(account));
  }

  async update(req, res, id) {
    const updated = await AccountsService.updateAccount(id, req.body);
    if (!updated) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Account not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updated));
  }

  async patch(req, res, id) {
    const updated = await AccountsService.patchAccount(id, req.body);
    if (!updated) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Account not found' }));
      return;
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updated));
  }

  async delete(req, res, id) {
    const deleted = await AccountsService.deleteAccount(id);
    if (!deleted) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Account not found' }));
      return;
    }
    res.writeHead(204, {});
    res.end();
  }
}

module.exports = new AccountsController();