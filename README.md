# NoteMate

NoteMate is a modern note-taking web application built with React that allows users to create, manage, and organize their notes with ease.

## Features

- 📝 Create and manage notes
- 🔐 User authentication (Login/Signup)
- 🌓 Dark/Light theme support
- 🖼️ Image upload functionality
- 🔒 Protected routes for secure access
- 📱 Responsive design

## Tech Stack

- **Frontend Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Authentication:** JWT (JSON Web Tokens)
- **Routing:** React Router

## Project Structure

```
src/
├── components/         # Reusable UI components
├── pages/             # Page components
├── utils/             # Utility functions
├── assets/           # Static assets
└── App.jsx           # Main application component
```

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/umairansari92/NoteMate-Frontend.git
   ```

2. Navigate to the project directory:
   ```bash
   cd NoteMate-Frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## Main Components

- `Navbar`: Navigation component with authentication status
- `ImageUploadBox`: Component for handling image uploads
- `NoteCards`: Display and manage notes
- `Toggler`: Theme switching component
- `ProtectedRoute`: Route wrapper for authenticated pages

## Pages

- `Home`: Landing page
- `AllNotes`: Display all user notes
- `Profile`: User profile management

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the [MIT License](LICENSE).

## Author

[Umair Ansari](https://github.com/umairansari92)
