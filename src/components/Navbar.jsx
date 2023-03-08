import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { GiKnifeFork } from "react-icons/gi";
import { GoHome } from "react-icons/go";

function Navbar({ categories }) {
  const { category, setCategory, name, setName } = useContext(UserContext);
  const selectCategory = async (event) => {
    setCategory(event.target.value);
  };

  const settingName = async (event) => {
    setName(event.target.value);
  };
  return (
    <nav>
      <div className=" flex justify-around p-4 m-4 rounded-md shadow ">
        <Link to="/">
          <GiKnifeFork className=" text-3xl" />
        </Link>
        <div className=" flex gap-5">
          <Link to="/">
            <GoHome className=" text-3xl" />
          </Link>
          <select
            className=" border border-blue-200 shadow-lg p-2"
            name="category"
            id="category"
            onChange={selectCategory}
          >
            <option value="" disabled selected hidden>
              Search by categories
            </option>
            {categories.map((categories) => {
              return (
                <option value={categories.strCategory}>
                  {categories.strCategory}
                </option>
              );
            })}
          </select>
          <input
            onChange={settingName}
            type="text"
            className=" text-black border border-blue-200 shadow-lg p-2"
            placeholder="Search by name"
          />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
