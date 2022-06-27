const fs = require('fs').promises;

const getCacheItem = async (key) => {
  try {
    const data = await fs.readFile(`cache/cache-${key}.json`);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return null;
  }
};

const setCacheItem = async (key, item) => {
  try {
    const data = JSON.stringify(item);
    await fs.writeFile(`cache/cache-${key}.json`, data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { getCacheItem, setCacheItem };
