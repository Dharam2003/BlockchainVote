# SecureVote: A Blockchain Voting System (Front-end Simulation)

SecureVote is a web-based application designed to demonstrate the core principles of a secure, transparent, and tamper-proof voting system. While the project is a front-end-only simulation, it utilizes a conceptual blockchain approach to showcase a decentralized voting process. All data, including users and votes, is managed locally using the browser's `localStorage`.

## Features

  * **User Authentication**: The system supports two distinct user roles:
      * **Voter (User)**: Registered voters can log in to cast their vote and view election results.
      * **Election Official (Admin)**: The admin can manage candidates and view a list of all registered voters, including their voting status.
  * **Vote Casting**: Voters can select a candidate and submit their vote. The system prevents users from voting more than once by updating their `voted` status.
  * **Real-time Results**: A dedicated page displays the current vote counts and percentages for each candidate, sorted from most to least votes.

## Technologies Used

  * **HTML5**: Provides the structure for all web pages, including the homepage, login, registration, and user/admin dashboards.
  * **CSS3**: Manages the styling and layout, with a shared stylesheet for a consistent look and feel.
  * **JavaScript**: Handles all client-side logic, including data storage in `localStorage`, user validation, and dynamic content updates.
  * **Font Awesome**: Used for icons to enhance the user interface.

## How to Run Locally

This is a static website and does not require any server-side dependencies. You can run it locally by following these steps:

1.  **Clone the repository**.
2.  Open the `index.html` file in your preferred web browser.

Alternatively, you can use a live server extension in a code editor like VS Code.

## Project Structure

```
.
├── .vscode/             # VS Code configuration
│   └── settings.json
├── admin.html           # Admin dashboard
├── index.html           # Landing page
├── login.html           # Login page
├── register.html        # Registration page
├── results.html         # Election results page
├── script.js            # Main JavaScript file
├── styles.css           # Global stylesheet
└── user.html            # Voter dashboard
```

## Future Updates

This project serves as a foundational prototype. To evolve it into a production-ready application, the following updates are recommended:

  * **Implement a True Blockchain**: The current implementation uses `localStorage` for all data. To truly align with the project's name and purpose, the application should integrate with a real blockchain (e.g., Ethereum, Solana) to store votes as immutable transactions.
  * **Backend & Database Integration**: Replace `localStorage` with a robust backend and a database (e.g., Node.js with MongoDB, Python with Django) to enable multi-user functionality and persistence beyond a single browser session.
  * **Enhanced Security**:
      * **Password Hashing**: Store user passwords as secure hashes instead of plain text to prevent data breaches.
      * **Advanced Authentication**: Implement multi-factor authentication (MFA) and more sophisticated validation logic.
  * **Code Consolidation**: The project has redundant JavaScript functions present in both the dedicated `script.js` file and inline within the HTML files. These should be consolidated into the main script file to improve maintainability and adherence to best practices.
  * **Improved User Experience**:
      * **Live Updates**: Implement web sockets to provide true real-time updates for election results without requiring a manual page refresh.
      * **Error Handling**: Enhance user feedback with more specific alerts and better form validation.
  * **Admin Features**: Expand the admin dashboard to include features like starting/ending elections, setting election rules, and managing user accounts.