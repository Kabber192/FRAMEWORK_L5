const { readJson, writeJson } = require('../db/db');

class ClientsService {
  async getAllClients() {
    return await readJson('clients.json');
  }

  async getClientById(id) {
    const clients = await readJson('clients.json');
    return clients.find(client => client.id === parseInt(id));
  }

  async createClient(data) {
    const clients = await readJson('clients.json');
    const newId = clients.length ? Math.max(...clients.map(c => c.id)) + 1 : 1;
    const newClient = {
      id: newId,
      name: data.name || `Client ${newId}`,
      age: data.age || 18,
      isActive: data.isActive !== undefined ? data.isActive : true,
      registrationDate: data.registrationDate || new Date().toISOString(),
      accounts: data.accounts || []
    };
    clients.push(newClient);
    await writeJson('clients.json', clients);
    return newClient;
  }

  async updateClient(id, data) {
    const clients = await readJson('clients.json');
    const index = clients.findIndex(client => client.id === parseInt(id));
    if (index === -1) return null;
    clients[index] = { ...clients[index], ...data, id: parseInt(id) };
    await writeJson('clients.json', clients);
    return clients[index];
  }

  async patchClient(id, data) {
    const clients = await readJson('clients.json');
    const index = clients.findIndex(client => client.id === parseInt(id));
    if (index === -1) return null;
    const updatedFields = {};
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(clients[index], key)) {
        updatedFields[key] = data[key];
      }
    }
    clients[index] = { ...clients[index], ...updatedFields };
    await writeJson('clients.json', clients);
    return clients[index];
  }

  async deleteClient(id) {
    const clients = await readJson('clients.json');
    const index = clients.findIndex(client => client.id === parseInt(id));
    if (index === -1) return false;
    const deleted = clients.splice(index, 1);
    await writeJson('clients.json', clients);
    return deleted[0];
  }
}

module.exports = new ClientsService();