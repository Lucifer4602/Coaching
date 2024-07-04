TechnoFlix

Overview
TechnoFlix is an online course platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This platform aims to provide a seamless experience for both students and instructors, offering features similar to popular platforms like Udemy.

Features
User Authentication: Secure login and registration for users and Instructors.
Course Management: Instructors can create, update, and delete courses.
Content Delivery: Streamlined delivery of video lectures.
Responsive Design: Optimized for desktop and mobile devices.
Payment Integration: Secure payment options for course purchases.(need to integrate this part)
Demo
Check out the live demo here. (technoflix.netlify.app)



Installation
To get a local copy up and running, follow these steps:

Prerequisites
Node.js
MongoDB
Installation Steps
Clone the repository

bash
Copy code
git clone https://github.com/Lucifer4602/Coaching.git
cd Coaching
Install dependencies

bash
cd backend
npm install
Set up environment variables
npm run start

Create a .env file in the root directory with the following variables:

env
Copy code
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
Run the application

for frontend:
cd frontend
npm install
npm run dev

Usage
Instructor Panel: Access the admin panel  to manage courses.
Course Enrollment: Users can browse available courses and enroll by making a payment.
Course Content: Once enrolled, users can access video lectures.
Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

Fork the Project
Create your Feature Branch (git checkout -b feature/AmazingFeature)
Commit your Changes (git commit -m 'Add some AmazingFeature')
Push to the Branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
Distributed under the MIT License. See LICENSE for more information.

Contact
Project Link: GitHub (https://github.com/Lucifer4602/Coaching)
Website: Technoflix (technoflix.netlify.app)
