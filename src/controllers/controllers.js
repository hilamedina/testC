const path = require('path');
const CSVToJSON = require('csvtojson');
const { promise: fs } = require('fs');
const converter = require('json-2-csv');

const { getCacheItem, setCacheItem } = require('../../cache');
const { idPlayer } = require('../../api/api');

const convertDataCsv = async () => {
  try {
    const dataCsvArray = await CSVToJSON().fromFile('dataBaseCsv/data.csv');
    return dataCsvArray;
  } catch (err) {
    return [];
    // res.status(400).send(error);
  }
};

const getPlayerData = async (req, res) => {
  const Id = req.params.id;
  try {
    const players = await convertDataCsv();
    const matchPlayerId = await players.find((onePlayer) => {
      return Id === onePlayer.id;
    });

    if (!matchPlayerId) {
      return res.status(404).send(`player id cannot be found`);
    }
    let playerInfo = await getCacheItem(matchPlayerId.id);
    if (!playerInfo) {
      playerInfo = await idPlayer(matchPlayerId.id);
      await setCacheItem(matchPlayerId.id, playerInfo);
    }
    const csvFile = await converter.json2csvAsync(playerInfo);
    res.header('Content-Type', 'text/csv');
    res.attachment(`player-info.${matchPlayerId.id}.csv`);
    return res.send(csvFile);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = { getPlayerData };
