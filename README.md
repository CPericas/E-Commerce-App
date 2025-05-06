# Advanced E-Commerce React
This is a full-featured e-commerce web application built using React, Redux, React-Bootstrap, Axios, Jest, and GitHub Actions for CI/CD integration. The app allows users to browse products, manage their cart, login, view order details, and perform actions like updating profiles or deleting accounts.

## Key Features
**Product Catalog**: Browse a wide range of products with options to filter and add them to your shopping cart.

**User Authentication**: Secure login and logout functionality with user session management.

**Cart Management**: Add, remove, and view items in your cart. Check out your cart and proceed with orders.

**Profile Management**: Update user profiles and delete accounts.

**Multi-language Support**: Available in multiple languages with easy switching between English and Spanish.

**Continuous Integration (CI) and Continuous Deployment (CD)**: Automated build, test, and deployment pipelines using GitHub Actions.

**Unit Testing**: Jest-based unit tests to ensure that all features function correctly.

## Technologies Used
**React (with hooks for state management)**

**Redux** (for global state management)

**React-Bootstrap** (for UI components)

**Axios** (for API requests)

**Jest** (for testing)

**GitHub Actions** (for CI/CD)

**React-i18next** (for internationalization)

## Features in Detail
### Product Catalog
Displays a list of products fetched from a mock API.

Each product displays its title, price, and image.

Products can be added to the shopping cart.

### User Authentication
Secure login functionality using a mock authentication service.

User sessions are managed via sessionStorage and localStorage.

Once logged in, users are redirected to their home page.

### Cart Management
Users can view their cart, which displays items and their quantities.

The cart can be cleared, and individual items can be removed.

### Profile and Account Management
Users can update their profiles and delete their accounts.

Deleting an account will remove all associated data and redirect users to the homepage.

### Multi-language Support
The application supports both English and Spanish. Users can easily switch between these languages.

### Testing
This project uses Jest for testing.

To run the tests:
bash
Copy code
npm run test
The tests will cover:

Product fetching: Ensuring products are fetched correctly.

Redux actions: Testing cart-related actions like adding/removing items.

Authentication: Ensuring login and error handling work as expected.

### CI/CD with GitHub Actions
This project uses GitHub Actions to automate the CI/CD pipeline. The workflow includes:

**Build and Test**: Every push to the master branch triggers the build process and runs tests.

**Deployment**: (Disabled for now but included in the workflow file) The deployment step will deploy the app to Vercel once the build and tests succeed.

### Workflow configuration
The CI workflow is configured in .github/workflows/main.yml.
