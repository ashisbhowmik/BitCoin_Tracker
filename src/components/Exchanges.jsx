import React, { useState, useEffect } from "react";
import axios from "../axios";
import request from "../request";
import { Collapse, Row, Col, Typography, Avatar } from "antd";
import millify from "millify";
import HTMLReactParser from "html-react-parser";
const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const [getExchange, setExchanges] = useState([]);
  useEffect(() => {
    const fetchExchanges = async () => {
      const res = await axios.get(request.exchanges);
      setExchanges(res.data?.data?.exchanges);
    };
    fetchExchanges();
  }, []);
  return (
    <>
      <Row style={{ padding: 10 }}>
        <Col span={6}>Exchanges</Col>
        <Col span={6}>24h Trade Volume</Col>
        <Col span={6}>Markets</Col>
        <Col span={6}>Change</Col>
      </Row>
      {getExchange.map((exchange) => (
        <Col span={24}>
          <Collapse>
            <Panel
              key={exchange.id}
              showArrow={false}
              header={
                <Row key={exchange.id}>
                  <Col span={6}>
                    <Avatar
                      style={{ marginLeft: 13, marginRight: 17 }}
                      src={exchange.iconUrl}
                    />
                    <Text
                      style={{ fontSize: 15, color: "green", fontWeight: 500 }}
                    >
                      {exchange.name}
                    </Text>
                  </Col>
                  <Col span={6}>${millify(exchange.volume)}</Col>
                  <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
                  <Col span={6}>{millify(exchange.marketShare)}%</Col>
                </Row>
              }
            >
              {HTMLReactParser(exchange.description || " ")}
            </Panel>
          </Collapse>
        </Col>
      ))}
    </>
  );
};

export default Exchanges;
