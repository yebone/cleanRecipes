import React, { useContext } from "react";
import { BsSearch } from "react-icons/bs";
import "./MealCart.css";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";

function MealCart({ name, image, id }) {
  const { truncateString } = useContext(UserContext);
  console.log(truncateString(name, 15));
  return (
    <div className=" relative parent">
      <img
        src={image}
        alt="picture of dish"
        className="image h-[300px]  object-fill rounded-lg"
      />
      <h1 className=" text-1xl text-blue-500">{truncateString(name, 35)}</h1>
      <Link to={`/detail/${id}`}>
        <p>
          <BsSearch className="icon text-3xl  bg-orange-500 rounded-[100%] p-1 absolute top-[40%] left-[50%] " />
        </p>
      </Link>
    </div>
  );
}

export default MealCart;
