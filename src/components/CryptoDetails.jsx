import React, { useEffect, useState } from "react";
import { Typography, Col, Row, Select, Avatar, Card } from "antd";
import { useParams } from "react-router-dom";
import LineChart from "./LineChart";
import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
const { Title, Text } = Typography;
const { Option } = Select;
const { Meta } = Card;

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [coin, setCoin] = useState({});
  const [selectVal, setselectVal] = useState("24h");
  const [coinHistory, setcoinHistory] = useState({});
  const [change, setChange] = useState();

  useEffect(() => {
    const url = `https://coinranking1.p.rapidapi.com/coin/${coinId}/?rapidapi-key=${process.env.REACT_APP_COINRANKING_API_KEY}`;
    const fetchData = async () => {
      const res = await fetch(url);
      const resData = await res.json();
      setCoin(resData?.data?.coin);
    };
    fetchData();
  }, [coinId]);

  useEffect(() => {
    const url = `https://coinranking1.p.rapidapi.com/coin/${coinId}/history/${selectVal}/?rapidapi-key=${process.env.REACT_APP_COINRANKING_API_KEY}`;
    const fetchCoinHistory = async () => {
      const res = await fetch(url);
      const resData = await res.json();
      setcoinHistory(resData?.data);
      setChange(resData?.data?.change);
    };
    fetchCoinHistory();
  }, [selectVal, coinId]);

  const time = ["24h", "7d", "30d", "1y", "5y"];
  const stats = [
    {
      title: "Price to USD",
      value: `₹ ${coin.price}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: coin.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `₹ ${coin.volume}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `₹ ${coin.marketCap}`,
      icon: <DollarCircleOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: coin.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: coin.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: coin.approvedSupply ? <CheckOutlined /> : <StopOutlined />,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `₹ ${coin.totalSupply}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `₹ ${coin.circulatingSupply}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col>
      <Col className="coin-heading-cotainer">
        <span>
          <Meta avatar={<Avatar src={coin.iconUrl} />} />
        </span>
        <Title level={3} style={{ color: "green", fontWeight: 700 }}>
          {coin.name} ({coin.slug}) Price
        </Title>
        <p>
          {coin.name} live price in Indian Ruppess (INR). View value statistics,
          market cap and supply.
        </p>
      </Col>
      <Select
        defaultValue="24h"
        className="select-timeperiod"
        placeholder="Select TimePeriod"
        onChange={(value) => setselectVal(value)}
      >
        {time.map((time) => {
          return <Option key={time}>{time}</Option>;
        })}
      </Select>
      <LineChart
        coinHistory={coinHistory}
        currentPrice={coin.price}
        coinName={coin.name}
        coinChange={change}
      />
      {/* generic Information About Coin */}
      <Col className="info-container">
        {/* value statictics */}
        <Col className="statistic-info-container">
          <Col className="heading-info">
            <Title style={{ color: "green", fontWeight: 700 }} level={3}>
              {coin.name} Value Statistics
            </Title>
            <p>
              An overview showing the statistics of {coin.name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {stats.map(({ title, value, icon }) => (
            <Col className="under_inf" style={{ padding: 10 }}>
              <Col className="under1-dif">
                <Text style={{ color: "green", fontWeight: 900 }}>{icon}</Text>
                <Text style={{ padding: 8 }}>{title}</Text>
              </Col>
              <Text style={{ fontWeight: 600 }}>{value}</Text>
            </Col>
          ))}
        </Col>
        <hr style={{ display: "flex", flexDirection: "column" }} />
        {/* other stats */}
        <Col>
          <Col className="heading-info">
            <Title style={{ color: "green", fontWeight: 700 }} level={3}>
              Other Stats Info
            </Title>
            <p>
              An overview showing the statistics of {coin.name}, such as the
              base and quote currency, the rank, and trading volume.
            </p>
          </Col>
          {genericStats.map(({ icon, title, value }) => (
            <Col className="under_inf" style={{ padding: 10 }}>
              <Col className="under1-dif">
                <Text style={{ color: "green", fontWeight: 900 }}>{icon}</Text>
                <Text style={{ padding: 8 }}>{title}</Text>
              </Col>
              <Text style={{ fontWeight: 600 }}>{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      {/* links and what is coin container */}
      <Col>
        {/* what is bitcoin and defination container/ */}
        <Col className="what-is-info">
          {/* <Title level={3} className="coin-details-heading">
            What is {coin.name}?
          </Title> */}
        </Col>
        {/* Links Container */}
        <Col className="coin-links">
          <Row>
            <Title level={3} className="coin-details-heading">
              {coin.name} Links
            </Title>
          </Row>
          <Col class="links">
            {coin?.links?.map((link) => (
              <Row className="under_inf" key={link.name}>
                <Title level={5} className="link-name">
                  {link.type}
                </Title>
                <a href={link.url} target="_blank" rel="noreferrer">
                  {link.name}
                </a>
              </Row>
            ))}
          </Col>
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
