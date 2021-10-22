import React, { useState } from "react";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import { Popover, Button } from "antd";
import axios from "axios";

interface Props {
  id?: any;
  order_id?: any;
}

const PopupAntd = ({ id, order_id }: Props) => {
  const [visible, setVisible] = useState(false);

  const resubmit = () => {
    // order_id for test = "3166568c-c495-4c21-b636-e5b9f8490f31";
    let order_id_resubmit = order_id || "3166568c-c495-4c21-b636-e5b9f8490f31";
    console.log("order id resubmit:" + order_id_resubmit);

    axios
      .post("https://licenceplateapi.kuber.jmango.vn/shimnit/v2/order", {
        order_id: order_id_resubmit,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const onDownload = () => {
    const idDownload = id || "5f840273602c7c0011cecf65";
    window.open(`http://localhost:3000/api/download/${idDownload}/download/`);
  };

  const handleVisibleChange = (nextVisible) => {
    setVisible(nextVisible);
  };

  const content = () => {
    return (
      <div>
        <Button onClick={resubmit}>Resubmit</Button>
        <Button onClick={onDownload}>Download</Button>
      </div>
    );
  };
  return (
    <Popover
      content={content}
      //   title="Title"
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
    >
      <Button type="primary">Action</Button>
    </Popover>
  );
};
export default PopupAntd;
