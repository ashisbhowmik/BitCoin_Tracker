import React, { useState, useEffect } from "react";
import { Typography, Row, Col, Statistic } from "antd";
import axios from "../axios";
import request from "../request";
import { Link } from "react-router-dom";
import Currencies from "./Currencies";
import News from "./News";
const { Title } = Typography;

const Home = () => {
  const [getstats, setStats] = useState("loading...");

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(request.stats);
      setStats(res?.data?.data);
    };
    fetchData();
  }, []);
  return (
    <div>
      <Title level={3}>Golbal Crypto Stats</Title>
      <Row style={{ marginBottom: 18 }}>
        <Col span={12}>
          <Statistic title="Total Currency" value={getstats.totalCoins} />
        </Col>
        <Col span={12}>
          <Statistic title="Exchanges" value={getstats.totalExchanges} />
        </Col>
        <Col span={12}>
          <Statistic title="Market Cap" value={getstats.totalMarketCap} />
        </Col>
        <Col span={12}>
          <Statistic title="24h Volume" value={getstats.total24hVolume} />
        </Col>
        <Col span={12}>
          <Statistic title="Total Markets" value={getstats.totalMarkets} />
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Title s level={3}>
          Currencies
        </Title>
        <h3
          style={{
            fontWeight: 500,
            cursor: "pointer",
            color: "blue",
          }}
        >
          <Link to="/currencies">Show More</Link>
        </h3>
      </div>

      <Currencies simplified />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 12,
        }}
      >
        <Title s level={3}>
          Get Latest News
        </Title>
        <h3
          style={{
            fontWeight: 500,
            cursor: "pointer",
            color: "blue",
          }}
        >
          <Link to="/news">Show More</Link>
        </h3>
      </div>
      <News simplified />
    </div>
  );
};

export default Home;
