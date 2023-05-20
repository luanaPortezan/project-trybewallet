# TrybeWallet Project

Welcome to the TrybeWallet Project repository! This project was developed as part of the Trybe web development course, aiming to apply the concepts learned throughout the course.

TrybeWallet is a web application for financial control, allowing users to register and track their financial transactions. With this application, you can add income and expense transactions, categorize them, and view a summary of your balance.

## Features

The project includes the following features:

- Registration of income and expense financial transactions.
- Categorization of transactions by type (food, leisure, transportation, etc.).
- Viewing the current balance and transaction summary.
- Calculation of the total balance considering the registered transactions.
- Viewing transaction history and its details.

## Technologies Used

The project was developed using the following technologies:

- JavaScript
- React
- Redux
- Node.js
- HTML5
- CSS3
- Exchange Rates API

## Installation of the project locally

Follow the instructions below to run the project on your local machine:

1. Make sure you have Node.js installed on your system.
2. Clone this repository using the following command:
   ```
   git clone https://github.com/luanaPortezan/project-trybewallet.git
   ```
3. Access the project directory:
   ```
   cd project-trybewallet
   ```
4. Install the project dependencies by running the following command in the terminal:
   ```
   npm install
   ```
5. Start the development server:
   ```
   npm start
   ```
6. Access the application in your browser using the address `http://localhost:3000`.

## Project Requirements

1. Create a login home page with the following fields and features.
2. Create a header for the portfolio page with the following characteristics.
3. Develop a form to add an expense with the following characteristics:
   - The WalletForm component must be rendered inside the Wallet component.
   - A field to add the expense amount.
   - A field to add the expense description.
   - A field to select the currency in which the expense will be recorded.
   - A field to select the payment method.
   - A field to select a category (tag) for the expense.
4. Save all form information in the global state.
5. Develop tests to achieve 60% coverage of the entire application.
6. Develop a table to display expenses with the following characteristics:
   - The Table component must be rendered inside the Wallet component.
   - The table must have a header with the following columns:
     - Description.
     - Tags.
     - Payment method.
     - Value.
     - Currency.
     - Used exchange.
     - Converted value.
     - Conversion currency.
     - Edit/Delete.
7. Implement the logic to populate the table using the application state.
8. Create a button to delete an expense from the table with the following characteristics:
   - The button must be the last item in each table row.
   - After the button is clicked, the following actions should occur:
     - The expense should be deleted from the global state.
     - The expense should no longer be displayed in the table.
     - The total value displayed in the header should be updated.
9. Create a button to edit an expense in the table with the following characteristics:
   - The button must be inside the last item of each table row.
   - When clicked, the button enables editing the expense by updating the global state.
10. Develop tests to achieve 90% coverage of the entire application.

## Contact

If you have any questions or suggestions regarding this project, feel free to contact:

- Luana Portezan
- Email: luanaportezan@gmail.com
- LinkedIn: [luanaportezan](https://www.linkedin.com/in/luanaportezan)
