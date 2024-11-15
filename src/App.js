import React from "react";
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from "./components/Login";
import Home from "./components/Home";
import AddRecipe from "./components/AddRecipe";
import Profile from './components/Profile';
import Recipes from './components/Recipes';
import RecipeDetail from './components/RecipeDetail';
import ChangePassword from './components/ChangePassword';
import MyRecipes from './components/MyRecipes';
import EditRecipe from './components/EditRecipe';
import AboutUs from './components/AboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/addrecipe" element={<AddRecipe />} />
        <Route path="/profile" element={<Profile />} /> 
        <Route path="/recipes" element={<Recipes />} /> 
        <Route path="/recipes/:recipeId" element={<RecipeDetail />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/myrecipes" element={<MyRecipes />} />
        <Route path="/edit-recipe/:recipeId" element={<EditRecipe />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
