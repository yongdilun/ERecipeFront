import React, { useState, useEffect, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FaStar, FaClock, FaUtensils, FaHourglassHalf, FaSearch } from 'react-icons/fa';
import axios from 'axios';
import './Recipes.css';
import Header from './Header';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Recipes = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '');
  const [sortBy, setSortBy] = useState('latest');
  const [cuisine, setCuisine] = useState('All');
  const [isLoading, setIsLoading] = useState(false);

  const cuisineOptions = ['All', 'Italian', 'Mexican', 'Indian', 'American'];

  const fetchRecipes = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes`, {
        params: {
          search: searchTerm,
          sortBy: sortBy,
          cuisine: cuisine
        }
      });
      if (Array.isArray(response.data)) {
        setRecipes(response.data);
      } else {
        setRecipes([]);
      }
    } catch (error) {
      console.error('Error fetching recipes:', error);
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm, sortBy, cuisine]);

  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
  };

  const RecipeCard = ({ recipe }) => (
    <div className="recipe-card">
      <div className="recipe-image-container">
        <img 
          src={`${API_BASE_URL}${recipe.image_url}`} 
          alt={recipe.title} 
          className="recipe-image" 
        />
        <div className="recipe-overlay">
          <Link to={`/recipes/${recipe._id}`} className="view-recipe-btn">
            View Recipe
          </Link>
        </div>
      </div>
      <div className="recipe-content">
        <h3>{recipe.title}</h3>
        <p className="recipe-description">{recipe.description}</p>
        
        <div className="recipe-info">
          <span className="cooking-info">
            <FaHourglassHalf className="icon" />
            {recipe.prep_time}m prep
          </span>
          <span className="cooking-info">
            <FaClock className="icon" />
            {recipe.cooking_time}m cook
          </span>
          <span className="cooking-info">
            <FaUtensils className="icon" />
            {recipe.servings} servings
          </span>
        </div>

        <div className="recipe-meta">
          <span className="recipe-cuisine">{recipe.cuisine}</span>
          <span className="recipe-rating">
            <FaStar className="icon" />
            {recipe.averageRating?.toFixed(1) || 'No ratings'}
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="recipes-page">
        <section className="hero-section">
          <h1>Explore Our Recipes</h1>
          <p>Find your next favorite dish from our collection of delicious recipes</p>
        </section>

        <div className="recipes-container">
          <div className="recipes-controls">
            <div className="search-box">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
            <div className="filter-controls">
              <select value={sortBy} onChange={handleSortChange} className="sort-select">
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="rating">Highest Rated</option>
              </select>
              <select value={cuisine} onChange={handleCuisineChange} className="cuisine-select">
                {cuisineOptions.map(option => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="loading">Loading recipes...</div>
          ) : recipes.length > 0 ? (
            <div className="recipe-grid">
              {recipes.map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="no-results">No recipes found</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Recipes;
