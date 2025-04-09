const fs = require('fs').promises;
const path = require('path');

const readJson = async (fileName) => {
  try {
    const data = await fs.readFile(path.join(__dirname, fileName), 'utf8');
    return JSON.parse(data);
  } catch (err) {
    throw new Error(`Error reading ${fileName}: ${err.message}`);
  }
};

const writeJson = async (fileName, data) => {
  try {
    await fs.writeFile(path.join(__dirname, fileName), JSON.stringify(data, null, 2));
  } catch (err) {
    throw new Error(`Error writing ${fileName}: ${err.message}`);
  }
};

module.exports = { readJson, writeJson };