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
  - Report Inappropriate Content
- Recipe Discovery
  - Search Recipes
  - Filter by Cuisine
  - Sort by Various Criteria
  - View Latest Recipes
  - View Top-Rated Recipes
- Admin Dashboard
  - User Management Overview
  - Recipe Management
  - Report Management
  - Activity Statistics
  - Content Moderation
- Content Reporting System
  - Report Recipes
  - Report Comments
  - Report Status Tracking
  - Admin Review Interface
- Responsive Design
  - Mobile-Friendly Interface
  - Adaptive Layout

## Tech Stack

- **React** - Frontend Framework
- **React Router** - Client-side Routing
- **Axios** - HTTP Client
- **React Icons** - Icon Components
- **Font Awesome** - Icon Library
- **React Draggable** - Draggable Components
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
│   │   ├── Signup.js
│   │   ├── AdminDashboard.js
│   │   ├── AdminHeader.js
│   │   ├── UserOverview.js
│   │   ├── RecipeOverview.js
│   │   ├── ManageRecipe.js
│   │   └── ManageReports.js
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
git clone https://github.com/yongdilun/ERecipeFront.git
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

## Dependencies

- **@fortawesome/fontawesome-svg-core**: Core library for Font Awesome, used to manage icons in SVG format.
- **@fortawesome/free-regular-svg-icons**: Collection of free regular-style icons from Font Awesome.
- **@fortawesome/free-solid-svg-icons**: Collection of free solid-style icons from Font Awesome.
- **@fortawesome/react-fontawesome**: React wrapper for Font Awesome, enabling easy integration of Font Awesome icons in React projects.
- **@testing-library/jest-dom**: Custom Jest matchers for testing DOM elements more effectively.
- **@testing-library/react**: Testing utilities for React components, helping simulate user interactions.
- **@testing-library/user-event**: Simulates complex user interactions like typing or clicking during tests.
- **axios**: Promise-based HTTP client for making API requests in JavaScript and React.
- **react**: Core library for building user interfaces with components.
- **react-dom**: React package for working with the DOM, enabling rendering of React components to web pages.
- **react-draggable**: Provides functionality for making elements draggable within React applications.
- **react-icons**: Library of popular icon sets for React, offering lightweight SVG-based icons.
- **react-router-dom**: Declarative routing library for handling navigation in React applications.
- **react-scripts**: Configuration and scripts for building React applications (used in Create React App projects).
- **web-vitals**: Utility for measuring essential web performance metrics like loading, interactivity, and visual stability.


## Admin Features

### Dashboard
- Overview of site statistics
- Recent activity monitoring
- User growth tracking
- Popular content analysis

### User Management
- User statistics overview
- Activity monitoring
- Role management
- User listing and details

### Recipe Management
- Recipe moderation
- Content editing
- Recipe deletion
- Statistics tracking

### Report Management
- Content report review
- Report status updates
- Draggable report details window
- Quick access to reported content

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

## How to Run Locally

1. Prerequisites:
   - Node.js (v18 or higher)
   - Git
   - Backend server running (see backend setup)

2. Clone the Repository:
   ```bash
   git clone https://github.com/yourusername/ERecipeHub.git
   cd ERecipeHub/frontend
   ```

3. Install Dependencies:
   ```bash
   npm install
   ```

4. Set Up Environment Variables:
   - Create `.env.development` file in the root directory
   ```env
   REACT_APP_API_URL=http://localhost:10000
   ```

5. Start the Development Server:
   ```bash
   npm start
   ```
   - This will open http://localhost:3000 in your browser
   - The page will reload when you make changes
   - Any lint errors will appear in the console

6. Build for Production (Optional):
   ```bash
   npm run build
   ```

7. Common Issues:
   - Port 3000 already in use: 
     - React will automatically suggest using another port
     - Type 'Y' to accept
   - API connection failed:
     - Ensure backend server is running
     - Check REACT_APP_API_URL in .env.development
   - Images not loading:
     - Verify backend server is running
     - Check image paths in backend public/images directory

8. Development Tips:
   - Use Chrome DevTools for debugging
   - Enable React Developer Tools extension
   - Check console for errors and warnings
   - Use Network tab to monitor API calls

9. Testing the Admin Interface:
   - Create a user account
   - Use MongoDB Compass to change user role to 'admin'
   - Log in with admin credentials
   - Access admin dashboard at /admin/dashboard
