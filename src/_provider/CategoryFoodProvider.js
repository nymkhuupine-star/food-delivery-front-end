// "use client";

// import { createContext, useContext, useState, useEffect } from "react";
// import axios from "axios";

// const AppContext = createContext(null);

// export const CategoryFoodProvider = ({ children }) => {
//   const [categories, setCategories] = useState([]);
//   const [catLoading, setCatLoading] = useState(false);

//   const [foods, setFoods] = useState([]);
//   const [foodLoading, setFoodLoading] = useState(false);

//   const [refresh, setRefresh] = useState(false);
//   const triggerRefresh = () => setRefresh((prev) => !prev);

//   const fetchCategories = async () => {
//     setCatLoading(true);
//     try {
//       const { data } = await axios.get("http://localhost:1000/category");
//       setCategories(data);
//     } finally {
//       setCatLoading(false);
//     }
//   };

//   const createCategory = async (payload) => {
//     const { data } = await axios.post(
//       "http://localhost:1000/category",
//       payload
//     );
//     setCategories((prev) => [data, ...prev]);
//     return data;
//   };

//   const updateCategory = async (id, payload) => {
//     const { data } = await axios.put(
//       `http://localhost:1000/category/${id}`,
//       payload
//     );
//     setCategories((prev) => prev.map((c) => (c._id === id ? data : c)));
//     return data;
//   };

//   const deleteCategory = async (id) => {
//     await axios.delete(`http://localhost:1000/category/${id}`);
//     setCategories((prev) => prev.filter((c) => c._id !== id));
//   };

//   const fetchFood = async () => {
//     setFoodLoading(true);
//     try {
//       const { data } = await axios.get(`http://localhost:1000/food`);
//       setFoods(data);
//     } finally {
//       setFoodLoading(false);
//     }
//   };

//   const fetchFoodById = async (id) => {
//     setFoodLoading(true);
//     try {
//       const { data } = await axios.get(`http://localhost:1000/food/${id}`);
//       setFoods(data);
//     } finally {
//       setFoodLoading(false);
//     }
//   };

//   const createFood = async (payload) => {
//     const { data } = await axios.post(`http://localhost:1000/food`, payload);
//     setFoods((prev) => [data, ...prev]);

//     triggerRefresh();
//     return data;
//   };

//   const updateFood = async (id, payload) => {
//     const { data } = await axios.put(
//       `http://localhost:1000/food/${id}`,
//       payload
//     );
//     setFoods((prev) => prev.map((f) => (f._id === id ? data : f)));

//     triggerRefresh();
//     return data;
//   };

//   const deleteFood = async (id) => {
//     await axios.delete(`http://localhost:1000/food/${id}`);
//     setFoods((prev) => prev.filter((f) => f._id !== id));

//     triggerRefresh();
//   };

//   useEffect(() => {
//     fetchCategories();
//     fetchFood();
//   }, []);

//   const value = {
//     categories,
//     catLoading,
//     fetchCategories,
//     createCategory,
//     updateCategory,
//     deleteCategory,

//     foods,
//     foodLoading,
//     fetchFood,
//     createFood,
//     updateFood,
//     deleteFood,
//     fetchFoodById,

//     refresh,
//     triggerRefresh,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useApp = () => useContext(AppContext);

"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AppContext = createContext(null);

export const CategoryFoodProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [catLoading, setCatLoading] = useState(false);

  const [foods, setFoods] = useState([]);
  const [foodLoading, setFoodLoading] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const triggerRefresh = () => setRefresh((prev) => !prev);

  const fetchCategories = async () => {
    setCatLoading(true);
    try {
      const { data } = await axios.get("http://localhost:1000/category");
      setCategories(data);
    } finally {
      setCatLoading(false);
    }
  };

  const createCategory = async (payload) => {
    const { data } = await axios.post(
      "http://localhost:1000/category",
      payload
    );
    setCategories((prev) => [data, ...prev]);
    return data;
  };

  const updateCategory = async (id, payload) => {
    const { data } = await axios.put(
      `http://localhost:1000/category/${id}`,
      payload
    );
    setCategories((prev) => prev.map((c) => (c._id === id ? data : c)));
    return data;
  };

  const deleteCategory = async (id) => {
    await axios.delete(`http://localhost:1000/category/${id}`);
    setCategories((prev) => prev.filter((c) => c._id !== id));
  };

  const fetchFood = async () => {
    setFoodLoading(true);
    try {
      const { data } = await axios.get("http://localhost:1000/food");
      setFoods(data);
    } finally {
      setFoodLoading(false);
    }
  };

  const fetchFoodByCategory = (categoryId) => {
    return foods.filter((f) => f.category === categoryId);
  };

  const createFood = async (payload) => {
    const { data } = await axios.post("http://localhost:1000/food", payload);
    setFoods((prev) => [data, ...prev]);
    triggerRefresh();
    return data;
  };

  const updateFood = async (id, payload) => {
    const { data } = await axios.put(
      `http://localhost:1000/food/${id}`,
      payload
    );
    setFoods((prev) => prev.map((f) => (f._id === id ? data : f)));
    triggerRefresh();
    return data;
  };

  const deleteFood = async (id) => {
    await axios.delete(`http://localhost:1000/food/${id}`);
    setFoods((prev) => prev.filter((f) => f._id !== id));
    triggerRefresh();
  };

  useEffect(() => {
    fetchCategories();
    fetchFood();
  }, []);

  return (
    <AppContext.Provider
      value={{
        categories,
        catLoading,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory,
        foods,
        foodLoading,
        fetchFood,
        createFood,
        updateFood,
        deleteFood,
        fetchFoodByCategory,
        refresh,
        triggerRefresh,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
