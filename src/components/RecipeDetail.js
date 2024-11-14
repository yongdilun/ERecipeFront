import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Header from './Header';
import './RecipeDetail.css';

const RecipeDetail = () => {
    const { recipeId } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [steps, setSteps] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [averageRating, setAverageRating] = useState(0);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [hasRated, setHasRated] = useState(false);
    const [totalRatings, setTotalRatings] = useState(0);
    const [totalComments, setTotalComments] = useState(0);

    const userId = localStorage.getItem('userId'); // Check if user is logged in

    const fetchRecipe = async () => {
        try {
            const recipeResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}`, {
                params: { user_id: userId },
            });

            const { recipe, averageRating, userRating } = recipeResponse.data;
            setRecipe(recipe);
            setAverageRating(Number(averageRating));
            setRating(userRating || 0);
            setHasRated(!!userRating);

            const ratingResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}/rate`);
            setAverageRating(Number(ratingResponse.data.averageRating));
            setTotalRatings(ratingResponse.data.totalRatings);

            const stepsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}/steps`);
            setSteps(stepsResponse.data);

            const ingredientsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}/ingredients`);
            setIngredients(ingredientsResponse.data);

            const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}/comments`);
            setComments(commentsResponse.data.comments);
            setTotalComments(commentsResponse.data.totalComments);
        } catch (error) {
            console.error('Error fetching recipe data:', error);
        }
    };

    useEffect(() => {
        fetchRecipe();
    }, [recipeId]);

    const handleRatingSubmit = async () => {
        try {
            if (!userId) {
                console.error("User ID not available. Please log in again.");
                return;
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}/rate`, {
                user_id: userId,
                rating
            });

            await fetchRecipe();
            setHasRated(true);
        } catch (error) {
            console.error('Error submitting rating:', error);
        }
    };

    const handleCommentSubmit = async () => {
        try {
            if (!userId) {
                console.error("User ID not available. Please log in again.");
                return;
            }

            await axios.post(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}/comment`, {
                user_id: userId,
                content: newComment
            });

            setNewComment('');

            const commentsResponse = await axios.get(`${process.env.REACT_APP_API_URL}/api/recipes/${recipeId}/comments`);
            setComments(commentsResponse.data.comments);
            setTotalComments(commentsResponse.data.totalComments);
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (!recipe) return <p>Loading...</p>;

    return (
        <div>
            <Header />
            <div className="recipe-detail-container">
                <div className="recipe-detail-content">
                    <div className="recipe-detail-info">
                        <h1>{recipe.title}</h1>
                        <p>Average Rating: {Number.isFinite(averageRating) ? averageRating.toFixed(1) : 'N/A'} / 5 ({totalRatings} ratings)</p>

                        <div className="rating-input">
                            <p>Rate this recipe:</p>
                            {[...Array(5)].map((_, index) => {
                                const starValue = index + 1;
                                return (
                                    <FaStar
                                        key={index}
                                        className="star"
                                        color={starValue <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                        size={30}
                                        onClick={() => !hasRated && setRating(starValue)}
                                        onMouseEnter={() => !hasRated && setHover(starValue)}
                                        onMouseLeave={() => !hasRated && setHover(null)}
                                    />
                                );
                            })}
                            {!hasRated && (
                                <button onClick={handleRatingSubmit} className="rating-submit-button" disabled={hasRated}>
                                    Submit Rating
                                </button>
                            )}
                        </div>

                        <div className="recipe-detail-meta">
                            <p><span role="img" aria-label="prep-time">⏱️</span> {recipe.prep_time} min prep</p>
                            <p><span role="img" aria-label="cook-time">🍳</span> {recipe.cooking_time} min cook</p>
                            <p><span role="img" aria-label="servings">🍽️</span> {recipe.servings} Servings</p>
                        </div>
                        <p className="recipe-detail-description">{recipe.description}</p>
                    </div>
                    <div className="recipe-detail-image-wrapper">
                        <img
                            src={`${process.env.REACT_APP_API_URL}${recipe.image_url}`}
                            alt={recipe.title}
                            className="recipe-detail-image"
                        />
                    </div>
                </div>

                <h2>Ingredients</h2>
                <ul className="recipe-ingredients">
                    {ingredients.map(ingredient => (
                        <li key={ingredient.ingredient_number}>
                            {ingredient.quantity} {ingredient.ingredient_name}
                        </li>
                    ))}
                </ul>

                <h2>Steps</h2>
                <ol className="recipe-steps">
                    {steps.map(step => (
                        <li key={step.step_number}>
                            <p>{step.description}</p>
                            {step.image_url && <img src={`${process.env.REACT_APP_API_URL}${step.image_url}`} alt={`Step ${step.step_number}`} className="recipe-step-image" />}
                        </li>
                    ))}
                </ol>

                <h2>Comments ({totalComments})</h2>
                <ul className="recipe-comments">
                    {comments.map(comment => (
                        <li key={comment._id} className="comment-item">
                            <p><strong>{comment.user_id.username}</strong> :</p>
                            <p>{comment.content}</p>
                            <p className="comment-date">{new Date(comment.created_at).toLocaleDateString()}</p>
                        </li>
                    ))}
                </ul>

                {/* Show comment input section only if the user is logged in */}
                {userId ? (
                    <div className="comment-section">
                        <textarea
                            className="comment-input"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Leave a comment"
                        />
                        <button onClick={handleCommentSubmit} className="comment-submit-button">
                            Submit Comment
                        </button>
                    </div>
                ) : (
                    <p>Log in to leave a comment.</p> // Message for non-logged-in users
                )}

            </div>
        </div>
    );
};

export default RecipeDetail;
