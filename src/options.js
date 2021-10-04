export const options = {
  method: "GET",
  url: "https://bing-news-search1.p.rapidapi.com/news/search",
  params: {
    q: "CryptoCurrency",
    freshness: "Day",
    textFormat: "Raw",
    safeSearch: "Off",
  },
  headers: {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": "bing-news-search1.p.rapidapi.com",
    "x-rapidapi-key": process.env.REACT_APP_COINRANKING_API_KEY,
  },
};
