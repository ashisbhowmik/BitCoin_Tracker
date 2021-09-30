import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Result
      status="500"
      title="Sorry ! This page does not exists 💁‍♀️🧏‍♂️🧏‍♂️👇👇"
      subTitle="Thanks For Considering us !"
      extra={
        <Button type="primary">
          <Link to="/">Back Home</Link>
        </Button>
      }
    />
  );
};

export default Error;
