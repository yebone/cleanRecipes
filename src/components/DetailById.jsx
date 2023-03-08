import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player/youtube";
import { BsYoutube } from "react-icons/bs";
import { GrResources } from "react-icons/gr";
import { UserContext } from "../UserContext";

const DetailById = () => {
  const { truncateString } = useContext(UserContext);
  const { id } = useParams();

  const [meal, setMealDetail] = useState([]);

  useEffect(() => {
    fetchDetailData();
  }, []);

  const fetchDetailData = async () => {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    const { meals } = await response.json();
    setMealDetail(meals[0]);
  };
  console.log(meal);
  //listing ingredients and their measurement;
  const ingredients = Object.keys(meal)
    .filter(
      (ingredient) =>
        ingredient.includes("strIngredient") &&
        meal[ingredient] !== "" &&
        meal[ingredient] !== null
    )
    .map((name) => meal[name]);

  const measurements = Object.keys(meal)
    .filter(
      (amount) =>
        amount.includes("strMeasure") &&
        meal[amount] !== "" &&
        meal[amount] !== null &&
        meal[amount] !== " "
    )
    .map((name) => meal[name]);

  return (
    <>
      <div className=" flex justify-evenly m-10 items-center ">
        <img
          src={meal.strMealThumb}
          className=" w-[500px] rounded-lg object-cover "
          alt="image of dish"
        />
        <div className=" w-[40vw]">
          <h1 className=" text-3xl font-bold text-blue-500 mb-5">
            {meal.strMeal}
          </h1>
          <h2 className=" font-bold text-blue-400 mb-3">{meal.strArea}</h2>
          <p>{truncateString(meal.strInstructions, 1300)}</p>
        </div>
      </div>
      <div className=" flex justify-evenly m-10">
        <div className="flex justify-center w-[50vw]">
          <ul>
            <li className=" text-1xl font-bold  border-blue-200 p-3">
              Ingredients
            </li>
            {ingredients?.map((ingredient) => {
              return (
                <li className=" border border-blue-200 p-3">{ingredient}</li>
              );
            })}
          </ul>
          <ul>
            <li className=" text-1xl font-bold  border-blue-200 p-3">
              Measurements
            </li>
            {measurements?.map((measurement) => {
              return (
                <li className=" border border-blue-200 p-3">{measurement}</li>
              );
            })}
          </ul>
        </div>
        <div className=" w-[50vw]">
          <div className=" flex justify-center items-center mb-5 ">
            <a
              href={meal.strYoutube}
              className="flex flex-col justify-center items-center"
            >
              <BsYoutube className=" text-5xl fill-red-600" />
              Learn on Youtube
            </a>
            <a
              href={meal.strSource}
              className="flex flex-col justify-center items-center"
            >
              <GrResources className=" text-5xl" />
              Learn from source
            </a>
          </div>
          <ReactPlayer url={meal.strYoutube} controls="true" />
        </div>
      </div>
    </>
  );
};

export default DetailById;
