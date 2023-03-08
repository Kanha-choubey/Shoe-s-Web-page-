import React from "react";
import Item from "./utils/Item";
import Titles from "./utils/Titles";

const Sales = ({ endpoint }) => {
  const { title, items } = endpoint;

  return (
    <>
      <div>
        <Titles title={title} />
        <div className="grid items-center justify-items-center grid-cols-4 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-7 lg:gap-5 mt">
          {items?.map((item, i) => (
            <Item {...item} key={i} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Sales;
