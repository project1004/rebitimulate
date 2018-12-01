const cache = require('lib/cache');
const axios = require('axios');

async function getExchangeRate() {
  try {
    const cached = await cache.get('exchage-rate');
    if(cached) {
      return cached;
    }
    //const response = await axios.get('http://api.fixer.io/latest?base=USD');
    const response = await axios.get('http://data.fixer.io/api/latest?access_key=9cb40419b7f62a7223021f28311588a9&symbols=USD'); 
    const data = {
      KRW: response.data.rates.KRW
    };
    // caches one hour
    cache.set('exchage-rate', data, 3600);
    return data;
  } catch (e) {
    throw(e);
  }
}

module.exports = getExchangeRate;