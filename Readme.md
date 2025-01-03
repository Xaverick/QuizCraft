# QuizCraft - Contest Giving Platform

Welcome to QuizCraft, a dynamic contest giving platform that allows users to engage in exciting, time-based contests, track their performance on leaderboards, and enhance their experience with unique features like gamification, referrals, and personalized dashboards. Admins have full control over creating contests, adding questions, and managing participants. Dive into the world of QuizCraft and experience an interactive, fun, and competitive environment.

## Features

### User Features:
- Account Creation & Login: Users can create accounts, log in, and manage their profiles.
- Contest Registration: Users can register for various contests and participate in time-based challenges.
- Leaderboard: Track your progress and compare scores with other participants through the dynamic leaderboard.
- Profile Dashboard: Personalize your profile with the ability to upload images and view your rating.
- Referral System: Earn coins by referring friends and encouraging others to join.
- Analytics: Get insights into your contest participation and performance.
- Gamification: Experience fun elements designed to make contests more engaging and rewarding.

### Admin Features:
- Admin Panel: Manage all aspects of the platform with ease.
- Contest Management: Admins can create new contests, set dates, and add questions for each contest.
- User Management: View and manage user details, performance, and ratings.
- Analytics: Track overall platform performance and contest participation statistics.

## Tech Stack
- Frontend: React, Tailwind CSS, Vite
- Backend: Node.js, Express, MongoDB
- Authentication: JWT-based authentication
- Payment Gateway: Razorpay for secure payments (if applicable)
- Admin Panel: Built with React and structured components for easy management
- Gamification: Python, Pygame (optional feature for gamified contests)

## Project Structure

```arduino
admin_2.0/
    ├── backend/
    ├── client/
    ├── .env
    ├── README.md
    └── public/
```

- backend/: Contains the server-side logic including controllers, routes, and database models.
- client/: The client-side application built using React, providing users and admins with the interface to interact with the system.
- public/: Contains static files, images, and assets for the platform.

## Getting Started

### Prerequisites
Before you begin, ensure you have the following installed:

- Node.js (version >= 14.x)
- npm (version >= 6.x)
- MongoDB instance (local or cloud)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Your-GitHubUsername/QuizCraft.git
cd QuizCraft
```

2. Install Dependencies
For the Backend:
```bash
cd backend
npm install
```

For the Client:
```bash
cd client
npm install
```

For the Admin:
```bash
cd admin
npm install
```

3. Set up Environment Variables
Create a .env file in the backend directory with the following required variables:
```makefile
DB_URL=mongodb+srv://<your-username>:<your-password>@cluster0.qaycstr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
USER_SECRET="your-secret-key"
SECRET="your-cookie-secret"
ADMIN_SECRET="your-admin-key"
EMAIL="your-email@example.com"
PASSWORD="your-email-password"
CONTACT_EMAIL="your-contact-email@example.com"
BACKEND_DOMAIN="http://your-backend-domain"
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_SECRET="your-razorpay-secret"
SITE_URL="http://your-site-url"
ADMIN_URL="http://your-admin-url"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

```

4. Run the Project
To start the backend server:
```bash
cd backend
nodemon index.js
```

To start the frontend (client) application:
```bash
cd client
npm run dev
```

To start the frontend (admin) application:
```bash
cd admin
npm run dev
```

Visit http://localhost:5173 in your browser to start using the platform (Client).
Visit http://localhost:5174 in your browser to start using the platform (Admin).

## Admin Panel Access
Admins can log in using predefined credentials to access the admin dashboard. From here, you can:
- Create and manage contests
- Add questions to contests
- View participant progress and scores
- Generate and manage user referrals

## Usage
- For Users: Create an account, explore available contests, participate, and monitor your performance.
- For Admins: Log in to the admin panel, create and configure contests, manage user information, and track system analytics.

## Features in Development
- Expanded Gamification: More interactive features like achievements, rewards, and badges.
- Enhanced Analytics: Deeper insights into user participation trends, contest outcomes, and more.

## Contributing
We welcome contributions! If you'd like to contribute to QuizCraft, please fork the repository, create a new branch for your changes, and submit a pull request. Ensure that your code adheres to our coding standards and includes tests where applicable.

## License
This project is licensed under the MIT License - see the LICENSE file for details.

Thank you for using QuizCraft! We hope you enjoy participating in and organizing contests. Happy coding!