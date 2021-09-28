const axios = require("axios").default;
const instance = axios.create({
  baseURL: "https://coinranking1.p.rapidapi.com",
});
export default instance;
