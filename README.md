# ERecipeHub Frontend

A React-based frontend for the ERecipeHub recipe sharing platform.

## Features

- User Authentication
  - Login/Signup
  - Password Change
  - Profile Management
- Recipe Management
  - Create New Recipes
  - Edit Existing Recipes
  - Delete Recipes
  - View Recipe Details
- Recipe Interactions
  - Rate Recipes
  - Comment on Recipes
  - Favorite Recipes
- Recipe Discovery
  - Search Recipes
  - Filter by Cuisine
  - Sort by Various Criteria
  - View Latest Recipes
  - View Top-Rated Recipes
- Responsive Design
  - Mobile-Friendly Interface
  - Adaptive Layout

## Tech Stack

- **React** - Frontend Framework
- **React Router** - Client-side Routing
- **Axios** - HTTP Client
- **React Icons** - Icon Components
- **Font Awesome** - Icon Library
- **CSS3** - Styling

## Project Structure

```
frontend/
├── public/
│   ├── images/
│   ├── _redirects
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddRecipe.js
│   │   ├── EditRecipe.js
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── MyRecipes.js
│   │   ├── Profile.js
│   │   ├── RecipeDetail.js
│   │   ├── Recipes.js
│   │   └── Signup.js
│   ├── App.js
│   └── index.js
├── .env.development
└── .env.production
```

## Environment Variables

### Development (.env.development)
```env
REACT_APP_API_URL=http://localhost:10000
```

### Production (.env.production)
```env
REACT_APP_API_URL=https://erecipehubback.onrender.com
```

## Available Scripts

### `npm start`
- Runs the app in development mode
- Opens [http://localhost:3000](http://localhost:3000)
- Hot reloads on changes

### `npm run build`
- Builds the app for production
- Outputs to the `build` folder
- Optimizes build for best performance

### `npm test`
- Launches the test runner
- Runs in interactive watch mode

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ERecipeFront.git
cd ERecipeFront
```

2. Install dependencies:
```bash
npm install
```

3. Create environment files:
- Copy `.env.example` to `.env.development` for local development
- Copy `.env.example` to `.env.production` for production
- Fill in the appropriate values

4. Start the development server:
```bash
npm start
```

## Deployment

The application is configured for deployment on Render:

1. Build Configuration:
```yaml
services:
  - type: web
    name: erecipehub
    env: static
    buildCommand: npm run build
    staticPublishPath: ./build
```

2. Routing Configuration:
- `static.json` for static file serving
- `_redirects` for client-side routing support

## Dependencies

- "@fortawesome/fontawesome-svg-core": "^6.6.0"
- "@fortawesome/free-regular-svg-icons": "^6.6.0"
- "@fortawesome/free-solid-svg-icons": "^6.6.0"
- "@fortawesome/react-fontawesome": "^0.2.2"
- "@testing-library/jest-dom": "^5.17.0"
- "@testing-library/react": "^13.4.0"
- "@testing-library/user-event": "^13.5.0"
- "axios": "^1.7.7"
- "react": "^18.3.1"
- "react-dom": "^18.3.1"
- "react-icons": "^5.3.0"
- "react-router-dom": "^6.28.0"
- "react-scripts": "^5.0.1"
- "web-vitals": "^2.1.4"

## Browser Support

```json
"browserslist": {
  "production": [
    ">0.2%",
    "not dead",
    "not op_mini all"
  ],
  "development": [
    "last 1 chrome version",
    "last 1 firefox version",
    "last 1 safari version"
  ]
}
```

## Contributing

Feel free to contribute to this project. Fork the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License. 
