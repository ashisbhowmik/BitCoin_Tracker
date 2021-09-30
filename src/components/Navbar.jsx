import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, Typography, Avatar, Button } from "antd";
import {
  HomeOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  BulbOutlined,
  MenuOutlined,
} from "@ant-design/icons";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(undefined);
  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);
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
        <Button
          className="menu-control-container"
          onClick={() => setActiveMenu(!activeMenu)}
        >
          <MenuOutlined className="menu-control-container-button" />
        </Button>
      </div>
      {activeMenu && (
        <Menu theme="dark" className="navbar-menu-whole">
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
      )}
    </div>
  );
};

export default Navbar;
