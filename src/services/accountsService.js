const { readJson, writeJson } = require('../db/db');

class AccountsService {
  async getAllAccounts() {
    return await readJson('accounts.json');
  }

  async getAccountById(id) {
    const accounts = await readJson('accounts.json');
    return accounts.find(account => account.id === parseInt(id));
  }

  async createAccount(data) {
    const accounts = await readJson('accounts.json');
    const newId = accounts.length ? Math.max(...accounts.map(a => a.id)) + 1 : 101;
    const newAccount = {
      id: newId,
      clientId: data.clientId || 1,
      balance: data.balance || 0,
      isBlocked: data.isBlocked !== undefined ? data.isBlocked : false,
      createdDate: data.createdDate || new Date().toISOString(),
      transactionHistory: data.transactionHistory || []
    };
    accounts.push(newAccount);
    await writeJson('accounts.json', accounts);
    return newAccount;
  }

  async updateAccount(id, data) {
    const accounts = await readJson('accounts.json');
    const index = accounts.findIndex(account => account.id === parseInt(id));
    if (index === -1) return null;
    accounts[index] = { ...accounts[index], ...data, id: parseInt(id) };
    await writeJson('accounts.json', accounts);
    return accounts[index];
  }

  async patchAccount(id, data) {
    const accounts = await readJson('accounts.json');
    const index = accounts.findIndex(account => account.id === parseInt(id));
    if (index === -1) return null;
    const updatedFields = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(accounts[index], key)) {
        updatedFields[key] = data[key];
      }
    }
    accounts[index] = { ...accounts[index], ...updatedFields };
    await writeJson('accounts.json', accounts);
    return accounts[index];
  }

  async deleteAccount(id) {
    const accounts = await readJson('accounts.json');
    const index = accounts.findIndex(account => account.id === parseInt(id));
    if (index === -1) return false;
    const deleted = accounts.splice(index, 1);
    await writeJson('accounts.json', accounts);
    return deleted[0];
  }
}

module.exports = new AccountsService();