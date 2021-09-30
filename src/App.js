import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import News from "./components/News";
import Navbar from "./components/Navbar";
import Currencies from "./components/Currencies";
import CryptoDetails from "./components/CryptoDetails";
import Exchanges from "./components/Exchanges";
import Error from "./components/Error";
import { Layout, Space, Typography } from "antd";
import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>

        <div className="main">
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route exact path="/currencies">
                  <Currencies />
                </Route>
                <Route exact path="/exchanges">
                  <Exchanges />
                </Route>
                <Route exact path="/news">
                  <News />
                </Route>
                <Route exact path="/crypto/:coinId">
                  <CryptoDetails />
                </Route>
                <Route path="">
                  <Error />
                </Route>
              </Switch>
            </div>
          </Layout>

          {/* footer */}
          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Copyright © 2021 <Link to="/">Cryptos Inc.</Link> <br />
              All right Reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
