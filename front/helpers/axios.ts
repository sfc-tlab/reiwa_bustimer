import * as axios from 'axios';

const get = async (url, headers={'Content-Type': 'application/json'}, params={}) => {
  try {
    return await axios.get(url, {
      headers,
      params,
      data: {}
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

module.exports = { get }
