import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import MealCart from "./MealCart";

function Meal() {
  const { category, name } = useContext(UserContext);
  //search by category
  const [meals, setMeals] = useState([]);

  const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`;

  useEffect(() => {
    fetchData();
  }, [category]);

  const fetchData = async () => {
    const response = await fetch(url);
    const { meals } = await response.json();
    setMeals(meals);
  };
  //search by name;
  const urlForName = `https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`;
  useEffect(() => {
    fetchDataByName();
  }, [name]);
  const fetchDataByName = async () => {
    const response = await fetch(urlForName);
    const { meals } = await response.json();
    setMeals(meals);
  };
  return (
    <div className=" flex flex-wrap gap-10 mt-10 justify-center">
      {meals?.map((meal) => {
        return (
          <MealCart
            key={meal.idMeal}
            id={meal.idMeal}
            name={meal.strMeal}
            image={meal.strMealThumb}
          />
        );
      })}
    </div>
  );
}

export default Meal;
