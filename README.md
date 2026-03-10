# Shoe Store E-Commerce Frontend Platform
**Internship Project Report Submission**

## Project Overview
This project is a modern, fully-responsive Frontend e-commerce application built for a conceptual Shoe Store. It demonstrates a strong understanding of current web development practices, focusing on component-based architecture, global state management, and modern styling techniques.

## Technologies Used
- **React.js (v19)**: Core library for building the user interface.
- **Vite**: Rapid development environment and highly optimized bundler.
- **Tailwind CSS (v4)**: Utility-first CSS framework used for rapid, responsive, and consistent styling.
- **React Router (v7)**: Handles client-side routing for a seamless Single Page Application (SPA) experience without page reloads.
- **React Context API**: Utilized for complex global state management (Shopping Cart logic).

## Key Features Implemented

### 1. Robust Architecture
The application layout was built using reusable components (`Navbar`, `Footer`, `ProductCard`) that are assembled into dynamic pages (`Home`, `Shop`, `Cart`).

### 2. State Management (Shopping Cart)
Implemented a custom custom hook (`useCart`) powered by the React Context API and `useReducer`. This allowed for centralizing complex cart logic:
- Adding items to the cart.
- Preventing duplicate entries (increments quantity instead).
- Dynamically updating item quantities with `+` and `-` controls.
- Removing items perfectly from state.
- Automatically recalculating cart totals, tax estimations, and dynamic shipping costs based on the total.

### 3. Asynchronous Data Handling
To simulate a real-world enterprise environment where frontend and backend are decoupled, a mock API service was created (`src/services/api.js`). This service uses Javascript Promises with artificial timeouts (`setTimeout`) to simulate network latency, demonstrating the ability to handle loading states smoothly within the React component lifecycle.

### 4. Responsive Design
The entire application is completely responsive, using Tailwind CSS breakpoints to adapt seamlessly from mobile devices to large desktop monitors.

## Project Structure
```text
src/
├── components/
│   ├── layout/       # Shared UI structure (Navbar, Footer)
│   └── product/      # Specific feature components (ProductCard)
├── context/          # Global state logic (CartContext.jsx)
├── data/             # Simulated database (mockProducts.js)
├── pages/            # Routable views (Home, Shop, Cart)
├── services/         # API abstraction layer (api.js)
├── App.jsx           # Main routing entry point
└── main.jsx          # React DOM root and Providers
```

## How to Run Locally
1. Ensure Node.js is installed.
2. Navigate to the `shoe-store-frontend` directory.
3. Run `npm install` to download dependencies.
4. Run `npm run dev` to start the development web server.
5. Open your browser to the URL provided in the terminal (usually `http://localhost:5173`).
