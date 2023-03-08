import React from "react";

const Table = ({ header }, { lists }) => {
  return (
    <>
      {lists?.map((list) => (
        <li>{list}</li>
      ))}
    </>
  );
};

export default Table;
