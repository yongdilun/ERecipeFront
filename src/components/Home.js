import React, { useState, useEffect } from 'react';
import Header from './Header';
import { FaStar, FaClock, FaUtensils, FaHourglassHalf, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import axios from 'axios';
import './Home.css';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [recipes, setRecipes] = useState({
    latestRecipes: [],
    topRatedRecipes: []
  });
  const [currentLatestIndex, setCurrentLatestIndex] = useState(0);
  const [currentTopRatedIndex, setCurrentTopRatedIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get('/api/home');
        setRecipes(response.data.data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      }
    };

    fetchRecipes();
  }, []);

  const RecipeCard = ({ recipe, type }) => (
    <div className="recipe-card" onClick={() => navigate(`/recipes/${recipe._id}`)}>
      <div className="recipe-image-container">
        <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
        <div className="recipe-overlay">
          <button className="view-recipe-btn">
            View Recipe <FaArrowRight className="arrow-icon" />
          </button>
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
          <span className="recipe-author">By {recipe.author.username}</span>
          {type === 'rated' && (
            <span className="recipe-rating">
              <FaStar className="icon star-icon" />
              {recipe.averageRating?.toFixed(1) || 0}
            </span>
          )}
          {type === 'latest' && (
            <span className="recipe-time">
              <FaClock className="icon clock-icon" />
              {new Date(recipe.createdAt).toLocaleDateString()}
            </span>
          )}
        </div>
      </div>
    </div>
  );

  const getVisibleRecipes = (recipeList, startIndex) => {
    return recipeList.slice(startIndex, startIndex + 4);
  };

  const handleNavigation = (direction, section) => {
    const container = document.querySelector(`.${section === 'latest' ? 'latest-recipes' : 'top-rated-recipes'} .recipe-grid`);
    
    if (container) {
      container.classList.remove('slide-left', 'slide-right', 'slide-from-left', 'slide-from-right');
      
      void container.offsetWidth;
      
      container.classList.add(direction === 'next' ? 'slide-left' : 'slide-right');
      
      setTimeout(() => {
        if (section === 'latest') {
          setCurrentLatestIndex(prev => {
            const newIndex = direction === 'next' ? prev + 4 : prev - 4;
            return Math.max(0, Math.min(newIndex, recipes.latestRecipes.length - 4));
          });
        } else {
          setCurrentTopRatedIndex(prev => {
            const newIndex = direction === 'next' ? prev + 4 : prev - 4;
            return Math.max(0, Math.min(newIndex, recipes.topRatedRecipes.length - 4));
          });
        }
        
        void container.offsetWidth;
        
        container.classList.remove('slide-left', 'slide-right');
        container.classList.add(direction === 'next' ? 'slide-from-right' : 'slide-from-left');
        
        setTimeout(() => {
          container.classList.remove('slide-from-right', 'slide-from-left');
        }, 300);
      }, 300);
    }
  };

  const NavigationButton = ({ direction, onClick, disabled }) => (
    <button 
      className={`nav-button ${disabled ? 'nav-button-disabled' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${direction} recipes`}
    >
      {direction === 'prev' ? (
        <FaChevronLeft aria-hidden="true" />
      ) : (
        <FaChevronRight aria-hidden="true" />
      )}
    </button>
  );

  return (
    <div className="recipe-hub">
      <Header />
      <main className="home-content">
        <section className="hero-section">
          <h1>Discover Amazing Recipes</h1>
          <p>Explore our collection of delicious recipes shared by food enthusiasts</p>
        </section>

        <section className="latest-recipes">
          <div className="section-header">
            <h2>Latest Recipes</h2>
            <button className="view-all-btn" onClick={() => navigate('/recipes')}>
              View All <FaArrowRight />
            </button>
          </div>
          <div className="recipe-section-container">
            <NavigationButton 
              direction="prev"
              onClick={() => handleNavigation('prev', 'latest')}
              disabled={currentLatestIndex === 0}
            />
            <div className="recipe-grid">
              {getVisibleRecipes(recipes.latestRecipes, currentLatestIndex).map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} type="latest" />
              ))}
            </div>
            <NavigationButton 
              direction="next"
              onClick={() => handleNavigation('next', 'latest')}
              disabled={currentLatestIndex >= recipes.latestRecipes.length - 4}
            />
          </div>
        </section>

        <section className="top-rated-recipes">
          <div className="section-header">
            <h2>Top Rated Recipes</h2>
            <button className="view-all-btn" onClick={() => navigate('/recipes')}>
              View All <FaArrowRight />
            </button>
          </div>
          <div className="recipe-section-container">
            <NavigationButton 
              direction="prev"
              onClick={() => handleNavigation('prev', 'rated')}
              disabled={currentTopRatedIndex === 0}
            />
            <div className="recipe-grid">
              {getVisibleRecipes(recipes.topRatedRecipes, currentTopRatedIndex).map(recipe => (
                <RecipeCard key={recipe._id} recipe={recipe} type="rated" />
              ))}
            </div>
            <NavigationButton 
              direction="next"
              onClick={() => handleNavigation('next', 'rated')}
              disabled={currentTopRatedIndex >= recipes.topRatedRecipes.length - 4}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
