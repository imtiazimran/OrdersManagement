# Sale Orders Management Application

This application allows users to manage sale orders efficiently. The key features include user authentication, theme toggling, and managing active and completed sale orders through forms and modals. This README provides an overview of the application's functionalities and the technology stack used.

## Live Site : [Click here](#https://orders-management-nine.vercel.app/)

## Table of Contents

- [Sale Orders Management Application](#sale-orders-management-application)
  - [Live Site : Click here](#live-site--click-here)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
    - [Login Flow](#login-flow)
    - [Theme Toggle](#theme-toggle)
    - [Sale Orders Management](#sale-orders-management)
      - [Adding a Sale Order](#adding-a-sale-order)
      - [Editing a Sale Order](#editing-a-sale-order)
      - [Viewing Completed Sale Orders](#viewing-completed-sale-orders)
  - [Data Flow](#data-flow)
    - [Example Data Flow for Adding a Sale Order](#example-data-flow-for-adding-a-sale-order)
    - [Example Data Flow for Editing a Sale Order](#example-data-flow-for-editing-a-sale-order)
  - [Tech Stack](#tech-stack)
  - [Installation](#installation)
  - [Usage](#usage)

## Features

### Login Flow

- **User Authentication:** Users need to log in with a dummy username and password.
- **Redirection:** If unauthenticated, users are redirected to the login page.

### Theme Toggle

- **Theme Management:** Users can switch between dark and light themes.
- **Persistence:** The theme preference is stored in local storage to retain the theme on reload.

### Sale Orders Management

- **Active Sale Orders:** Manage and edit active sale orders.
- **Completed Sale Orders:** View details of completed sale orders in a read-only format.

#### Adding a Sale Order

- **Modal Form:** Add a new sale order through a modal form.
- **Form Management:** Use React Hook Form for form inputs and validations.
- **State Update:** Update the active sale orders list without refreshing the page.

#### Editing a Sale Order

- **Prefilled Modal Form:** Edit an active sale order through a prefilled modal form.
- **Form Management:** Use React Hook Form for form state.
- **State Update:** Update the active sale orders list synchronously.

#### Viewing Completed Sale Orders

- **Read-Only Form:** View completed sale orders in a read-only modal form.

## Data Flow

### Example Data Flow for Adding a Sale Order

1. **Form Submission:**
   - User fills out the sale order form and submits.
   - Form data is validated using React Hook Form.
2. **API Call Simulation:**
   - Use React Query to mimic an API call to the backend to create a new sale order.
   - On success, update the active sale orders list.
3. **State Update:**
   - The new sale order is added to the local state managed by React Query.
   - The UI is updated to reflect the new sale order without a page refresh.

### Example Data Flow for Editing a Sale Order

1. **Edit Button Click:**
   - User clicks the edit button for an active sale order.
   - Open a modal form prefilled with the sale order details.
2. **Form Submission:**
   - User updates the sale order details and submits the form.
   - Form data is validated using React Hook Form.
3. **API Call Simulation:**
   - Use React Query to mimic an API call to the backend to update the sale order.
   - On success, update the active sale orders list.
4. **State Update:**
   - The updated sale order is reflected in the local state managed by React Query.
   - The UI is updated to reflect the changes without a page refresh.

## Tech Stack

- **React Router DOM:** For routing between the login page and the main application.
- **React Query:** For fetching and managing sale orders data.
- **React Hook Form:** For managing form state and validations.
- **Chakra UI:** For UI components and styling.
- **Chakra MultiSelect:** For selecting multiple products in forms.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/imtiazimran/OrdersManagement.git
   ```
2. Navigate to the project directory

```bash
cd sale-orders-management
```

3. Install Dependencies:

```bash
npm install
```

## Usage

1. Start the development server

```bash
npm run dev
```

2. Open the application in your browser

```bash
http://localhost:3000
```
