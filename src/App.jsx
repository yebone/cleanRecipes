import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import { UserContext } from "./UserContext";

function App() {
  //useContext
  const [name, setName] = useState("");
  const [category, setCategory] = useState("beef");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const { categories } = await response.json();
    setCategories(categories);
  };
  //function
  const truncateString = (str, num) => {
    if (str?.length > num) {
      return str.slice(0, num) + "...";
    } else {
      return str;
    }
  };
  return (
    <div>
      <UserContext.Provider
        value={{ category, setCategory, name, setName, truncateString }}
      >
        <Navbar categories={categories} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
