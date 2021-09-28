import React from "react";
import { Link } from "react-router-dom";
import { Menu, Typography, Avatar } from "antd";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  return (
    <div className="nav-container">
      <div className="nav-logo">
        <Avatar
          size="large"
          src={
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgy6JN32-Dc82LOkGLMVolV7DUq5rRLHlSxd9lHNbNr1AsFujfexpa2spkdFVXl0q5uS8&usqp=CAU"
          }
        />
        <Typography.Title level={2} className="logo-text">
          <Link to="/" style={{ color: "#ECC983" }}>
            Cryptos
          </Link>
        </Typography.Title>
      </div>
      <Menu theme="dark">
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<FundOutlined />}>
          <Link to="/currencies">Currencies</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<MoneyCollectOutlined />}>
          <Link to="/exchanges">Exchanges</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BulbOutlined />}>
          <Link to="/news">News</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navbar;
