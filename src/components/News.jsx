import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Avatar, Typography, Select } from "antd";
import moment from "moment";
import axios2ndVersion from "../axios";
import request from "../request";
const { Option } = Select;
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = ({ simplified }) => {
  const [newsContent, setNewsContent] = useState([]);
  const [newsCategory, setNewsCategory] = useState("CryptoCurrency");
  const [coins, setCoins] = useState([]);
  // const [input, setInput] = useState("");

  const options = {
    method: "GET",
    url: "https://bing-news-search1.p.rapidapi.com/news/search",
    params: {
      q: `${newsCategory}`,
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
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios2ndVersion.get(request.coins);
      setCoins(res?.data?.data?.coins);
    };
    fetchData();
  }, []);
  useEffect(() => {
    const getNewsData = async () => {
      const response = await axios.request(options);
      setNewsContent(response?.data?.value);
    };
    getNewsData();
  }, [options.params.q]);
  return (
    <>
      {!simplified && (
        <Col style={{ marginBottom: 60 }} span={24} className="news-div">
          <Select
            showSearch
            placeholder="Select a Crypto"
            className="select-news"
            optionFilterProp="children"
            onChange={(value) => setNewsCategory(value)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="CryptoCurrency">CryptoCurrency</Option>
            {coins.map((coin) => (
              <Option value={coin.name}>{coin.name}</Option>
            ))}
          </Select>
        </Col>
      )}
      {
        <Row gutter={[32, 32]}>
          {newsContent.map((news, idx) => {
            return (
              <Col xs={24} sm={12} lg={8} key={idx} style={{ padding: 10 }}>
                <a href={news.url} target="_blank" rel="noreferrer">
                  <Card hoverable>
                    {/* news image container */}
                    <div className="news-image-container">
                      <Typography.Title className="news-title">
                        {news.name}
                      </Typography.Title>
                      <img
                        src={news?.image?.thumbnail?.contentUrl || demoImage}
                        alt=""
                      />
                    </div>
                    <p>
                      {news.description.length > 100
                        ? news.description.substr(0, 100) + "..."
                        : news.description}
                    </p>
                    {/* provider-container */}
                    <div className="provider-container">
                      <div>
                        <Avatar
                          src={
                            news.provider[0]?.image?.thumbnail?.contentUrl ||
                            demoImage
                          }
                          alt=""
                        />
                        <Typography.Text className="provider-name">
                          {news.provider[0]?.name}
                        </Typography.Text>
                      </div>
                      <Typography.Text>
                        {moment(news?.datePublished).startOf("ss").fromNow()}
                      </Typography.Text>
                    </div>
                  </Card>
                </a>
              </Col>
            );
          })}
        </Row>
      }
    </>
  );
};

export default News;
