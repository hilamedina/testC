const axios = require('axios');

const idPlayer = async (id) => {
  const { data } = await axios({
    url: `https://www.balldontlie.io/api/v1/players/${id}`,
    method: 'get',
  });
  return data;
};
module.exports = { idPlayer };
