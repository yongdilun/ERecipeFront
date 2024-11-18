import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import './ManageRecipe.css';
import { FaTrash, FaStar, FaClock, FaUtensils, FaHourglassHalf, FaComment } from 'react-icons/fa';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const ManageRecipe = () => {
    const { recipeId } = useParams();
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecipeAndComments();
    }, [recipeId]);

    const fetchRecipeAndComments = async () => {
        try {
            const token = localStorage.getItem('token');
            const [recipeRes, commentsRes] = await Promise.all([
                axios.get(`${API_BASE_URL}/api/recipes/${recipeId}`),
                axios.get(`${API_BASE_URL}/api/recipes/${recipeId}/comments`)
            ]);

            setRecipe(recipeRes.data.recipe);
            setComments(commentsRes.data.comments);
            setLoading(false);
        } catch (err) {
            setError('Error fetching recipe details');
            setLoading(false);
        }
    };

    const handleEdit = () => {
        navigate(`/admin/recipes/${recipeId}/edit`);
    };

    const handleDeleteRecipe = async () => {
        if (window.confirm('Are you sure you want to delete this recipe? This action cannot be undone.')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_BASE_URL}/api/admin/recipes/${recipeId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                navigate('/admin/recipes');
            } catch (err) {
                setError('Error deleting recipe');
            }
        }
    };

    const handleDeleteComment = async (commentId) => {
        if (window.confirm('Are you sure you want to delete this comment?')) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`${API_BASE_URL}/api/admin/comments/${commentId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                // Refresh comments after deletion
                const commentsRes = await axios.get(`${API_BASE_URL}/api/recipes/${recipeId}/comments`);
                setComments(commentsRes.data.comments);
            } catch (err) {
                setError('Error deleting comment');
            }
        }
    };

    if (loading) return (
        <div className="manage-recipe">
            <AdminHeader />
            <div className="manage-recipe-container">
                <div>Loading...</div>
            </div>
        </div>
    );

    if (error) return (
        <div className="manage-recipe">
            <AdminHeader />
            <div className="manage-recipe-container">
                <div className="error-message">{error}</div>
            </div>
        </div>
    );

    return (
        <div className="manage-recipe">
            <AdminHeader />
            <div className="manage-recipe-container">
                <div className="recipe-header">
                    <h1>{recipe.title}</h1>
                    <div className="action-buttons">
                        <button onClick={handleEdit} className="edit-button">
                            Edit Recipe
                        </button>
                        <button onClick={handleDeleteRecipe} className="delete-button">
                            Delete Recipe
                        </button>
                    </div>
                </div>

                <div className="recipe-content">
                    <div className="recipe-image">
                        <img 
                            src={recipe.image_url.startsWith('http') 
                                ? recipe.image_url 
                                : `${API_BASE_URL}${recipe.image_url}`} 
                            alt={recipe.title} 
                        />
                    </div>

                    <div className="recipe-info">
                        <p className="description">{recipe.description}</p>
                        <div className="recipe-stats">
                            <span><FaHourglassHalf /> {recipe.prep_time}m prep</span>
                            <span><FaClock /> {recipe.cooking_time}m cook</span>
                            <span><FaUtensils /> {recipe.servings} servings</span>
                            <span><FaStar /> {recipe.averageRating?.toFixed(1) || 'No ratings'}</span>
                        </div>
                    </div>

                    <div className="comments-section">
                        <h2>Comments ({comments.length})</h2>
                        <div className="comments-list">
                            {comments.map(comment => (
                                <div key={comment._id} className="comment">
                                    <div className="comment-header">
                                        <span className="comment-author">
                                            {comment.user_id.username}
                                        </span>
                                        <span className="comment-date">
                                            {new Date(comment.created_at).toLocaleDateString()}
                                        </span>
                                        <button 
                                            onClick={() => handleDeleteComment(comment._id)}
                                            className="delete-comment-button"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                    <p className="comment-content">{comment.content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManageRecipe;
