const isEqual = require('lodash.isequal');

const { idPlayer } = require('./api/api');
const { getCacheItem, setCacheItem } = require('./cache');
const { getPlayerData } = require('./src/controllers/controllers');

const updatePlayersChange = async () => {
  const players = await getPlayerData();
  players.map((player) => {
    pullPlayerDetails(player.id);
  });
};

const pullPlayerDetails = async (id) => {
  const playerInfo = await playersApi(id);
  const playerCache = await getCacheItem(id);
  let updatedCache = {};
  if (!isEqual(playerInfo, playerCache)) {
    updatedCache = playerInfo;
    setCacheItem(id, playerInfo);
  }
};

module.exports = { updatePlayersChange };
