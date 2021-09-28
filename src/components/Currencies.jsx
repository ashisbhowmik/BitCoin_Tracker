import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";
import request from "../request";
import { Card, Col, Row, Avatar, Input, Statistic } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import millify from "millify";
const { Meta } = Card;

const Currencies = ({ simplified }) => {
  const [getcoins, setCoins] = useState([]);
  const [input, setInput] = useState("");

  // useEffect for Searching the setCoins
  // useEffect(() => {
  //   setCoins(getcoins?.data?.data?.coin);
  //   const filterSearchData = getcoins?.data?.data?.coin.filter((item) => {
  //     item.name.toLowerCase().includes(input);
  //   });
  //   setCoins(filterSearchData);
  // }, [input, getcoins]);

  // useEffect for get the endpoint's data white the page is reloding
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(request.coins);
      setCoins(res?.data?.data?.coins);
    };
    fetchData();
  }, []);
  return (
    <>
      {!simplified && (
        <div>
          <Input
            prefix={<SearchOutlined />}
            placeholder="Search CryptoCurrency"
            style={{
              width: 200,
              marginBottom: 13,
              borderRadius: 6,
            }}
            onChange={(e) => setInput(e.target.value.toLocaleLowerCase())}
          />
        </div>
      )}
      <Row gutter={[32, 32]}>
        {getcoins.map((coin, idx) => {
          return (
            <Col xs={24} sm={12} lg={6} key={coin.id} style={{ padding: 7 }}>
              <Link to={`/crypto/${coin.id}`}>
                <Card hoverable>
                  <Meta
                    title={coin.name}
                    avatar={<Avatar src={coin.iconUrl} />}
                  />
                  <br />
                  <p>price : {millify(coin.price)}</p>
                  <p>MarketCap : {millify(coin.marketCap)}</p>
                  <span>
                    <Statistic
                      value={coin.change}
                      valueStyle={
                        coin.change > 0
                          ? { color: "#3f8600", fontSize: 25, fontWeight: 400 }
                          : { color: "#cf1322", fontSize: 19, fontWeight: 400 }
                      }
                      prefix={
                        coin.change > 0 ? (
                          <ArrowUpOutlined />
                        ) : (
                          <ArrowDownOutlined />
                        )
                      }
                      suffix="%"
                    />
                  </span>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Currencies;
