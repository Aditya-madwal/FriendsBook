# FriendsBook

**FriendsBook** is a full-stack social media application built using Django Rest Framework for the backend and React.js for the frontend. The app provides a platform where users can connect with friends, share posts, engage in conversations, and interact with content through likes and comments.

## Features

### 1. User Authentication

- User registration and login.
- Secure authentication with JWT (JSON Web Tokens).
- Profile management with the ability to update profile pictures.

### 2. Posting

- Users can create posts that include text and images.
- Posts are displayed in a feed where users can view content shared by their friends.

### 3. Friendship Management

- **Add Friend:** Send friend requests to other users.
- **Delete Friend:** Remove friends from your friend list.
- **Friend Requests:** Accept or decline friend requests.

### 4. Chat

- Real-time one-on-one chat with friends.
- Send text messages and images within the chat.
- Previous chat history is stored and can be viewed.

### 5. Post Interaction

- **Comments:** Comment on posts made by friends.
- **Likes:** Like posts to show appreciation.

## Technologies Used

### Backend

- **Django Rest Framework**: For building RESTful APIs.
- **Django Channels**: For real-time WebSocket connections (chat functionality).
- **PostgreSQL**: As the primary database.

### Frontend

- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling the application.
- **Axios**: For making HTTP requests to the backend.

### Deployment

- **Docker**: For containerizing the application.
- **NGINX**: As a reverse proxy server.
- **Gunicorn**: For serving the Django application.

## Installation

### Prerequisites

- Python 3.x
- Node.js
- PostgreSQL
- Docker (optional for containerization)

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/friendsbook.git
   cd friendsbook/backend
   ```

2. **Create a virtual environment and install dependencies:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   pip install -r requirements.txt
   ```

3. **Set up the database:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

4. **Run the development server:**
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm start
   ```

### Running with Docker

1. **Build and run the Docker containers:**
   ```bash
   docker-compose up --build
   ```

## Usage

- **User Registration:** Sign up with a new account.
- **Login:** Log in using your credentials.
- **Posts:** Create, view, and interact with posts.
- **Friends:** Send friend requests and manage your friend list.
- **Chat:** Engage in real-time chat with your friends.

## Screenshots

### Home Feed

![Home Feed](path-to-screenshot-home.png)

### Friend Requests

![Friend Requests](path-to-screenshot-friend-requests.png)

### Chat Interface

![Chat Interface](path-to-screenshot-chat-interface.png)

### Post Interaction

![Post Interaction](path-to-screenshot-post-interaction.png)

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- **Django Rest Framework** for making API development easy.
- **React.js** for the powerful and flexible front-end development.
- **Tailwind CSS** for making styling easier and faster.
