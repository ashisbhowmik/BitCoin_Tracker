const API_ID = process.env.REACT_APP_COINRANKING_API_KEY;

const request = {
  stats: `/stats/?rapidapi-key=${API_ID}`,
  coins: `/coins/?rapidapi-key=${API_ID}`,
  exchanges: `/exchanges/?rapidapi-key=${API_ID}`,
};
export default request;
