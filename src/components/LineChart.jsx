import React from "react";
import { Line } from "react-chartjs-2";
import { Statistic } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const LineChart = ({ coinHistory, currentPrice, coinName, coinChange }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  {
    coinHistory?.history?.map((elem, idx) => coinPrice.push(elem.price));
  }
  {
    coinHistory?.history?.map((elem, idx) =>
      coinTimestamp.push(new Date(elem.timestamp).toLocaleDateString())
    );
  }

  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price In INR",
        data: coinPrice,
        fill: false,
        backgroundColor: "red",
        borderColor: "green",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };
  return (
    <>
      <div class="price-chart">
        <h1 style={{ marginTop: 11 }}>Price Chart</h1>
        <div>
          <h3 className="price-change">
            price
            {coinChange > 0 ? " up :" : " down :"}
            <Statistic
              value={coinChange}
              valueStyle={
                coinChange > 0
                  ? { color: "#3f8600", fontSize: 25, fontWeight: 900 }
                  : { color: "#cf1322", fontSize: 19, fontWeight: 900 }
              }
              prefix={
                coinChange > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />
              }
              suffix="%"
            />
          </h3>
          <h4 className="current-price">
            Current {coinName} Price: ₹ {currentPrice}
          </h4>
        </div>
      </div>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
