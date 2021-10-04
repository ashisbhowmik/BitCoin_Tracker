import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Col, Row, Avatar, Typography } from "antd";
import { options } from "../options";
import moment from "moment";
const demoImage =
  "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";

const News = () => {
  const [newsContent, setNewsContent] = useState([]);
  useEffect(() => {
    const getNewsData = async () => {
      const response = await axios.request(options);
      setNewsContent(response?.data?.value);
    };
    getNewsData();
  }, []);
  return (
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
  );
};

export default News;
