import React from "react";
import Item from "./utils/Item";
import Titles from "./utils/Titles";

const Sales = ({ endpoint }) => {
  const { title, items } = endpoint;

  return (
    <div>
      <Titles title={title} />
      <div>
        {items?.map((item, i) => (
          <Item {...item} key={i} />
        ))}
      </div>
    </div>
  );
};

export default Sales;
