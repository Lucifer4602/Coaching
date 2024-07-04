# TechnoFlix

## Overview

**TechnoFlix** is an online course platform built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). This platform aims to provide a seamless experience for both students and instructors, offering features similar to popular platforms like Udemy.

## Features

- **User Authentication:** Secure login and registration for users and instructors.
- **Course Management:** Instructors can create, update, and delete courses.
- **Content Delivery:** Streamlined delivery of video lectures.
- **Responsive Design:** Optimized for desktop and mobile devices.
- **Payment Integration:** Secure payment options for course purchases (need to integrate this part).

## Demo

Check out the live demo [here](https://technoflix.netlify.app/).

## Installation

To get a local copy up and running, follow these steps:

### Prerequisites

- Node.js
- MongoDB

## Installation

### Backend Setup
1. Navigate to the backend directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up environment variables:
    - Create a `.env` file in the root directory with the following variables:
        ```env
        MONGO_URI=your_mongodb_connection_string
        JWT_SECRET=your_jwt_secret
        ```

4. Run the application:
    ```bash
    npm run start
    ```

### Frontend Setup
1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Start the development server:
    ```bash
    npm run dev
    ```

## Usage
- **Instructor Panel**: Access the admin panel to manage courses.
- **Course Enrollment**: Users can browse available courses and enroll by making a payment.
- **Course Content**: Once enrolled, users can access video lectures, notes, and practice MCQs.

## Contributing
Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are greatly appreciated.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
Distributed under the MIT License. See `LICENSE` for more information.

## Contact
- Project Link: [GitHub](https://github.com/your-username/technoflix)
- Website: [Technoflix](https://technoflix.com)


