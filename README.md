# Prep - Audio Recording & Management App

A modern, production-ready web application for recording, saving, and managing audio communications. Built with React, Vite, and Firebase.

## Features

- **Audio Recording** - Record high-quality audio directly from your browser
- **Secure Authentication** - Sign up and login with email/password or Google OAuth
- **Audio Library** - Browse, filter, and manage all your recordings
- **Share & Download** - Share recordings via WhatsApp, Twitter, Email, or copy link
- **Dark Mode** - Beautiful dark and light theme support
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Local Storage** - All recordings persist in localStorage for offline access
- **Contact Support** - Built-in contact form powered by Formspree

## Tech Stack

- **Frontend**: React 19.2.0 with React Router v7
- **Build Tool**: Vite v7.3.1
- **Authentication**: Firebase Auth (Email/Password + Google OAuth)
- **Styling**: CSS with theme context
- **Audio**: Web Audio API
- **Code Quality**: ESLint
- **Forms**: Formspree integration

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd prep

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# Lint code
npm run lint

# Build for production
npm run build
```

The app will be available at `http://localhost:5073`

## Project Structure

```
src/
├── components/          # React components
│   ├── AudioCard/       # Recording card component
│   ├── AudioPlayer/     # Audio player controls
│   ├── ContactPopup/    # Contact form modal
│   ├── Footer/          # App footer
│   ├── Home/            # Recording page
│   ├── Library/         # Recordings library
│   ├── LoadingScreen/   # Initial splash screen
│   ├── Navbar/          # Navigation bar
│   ├── ProfileDropdown/ # User profile menu
│   ├── RecordingButton/ # Recording controls
│   └── SignInModal/     # Authentication modal
├── context/             # Theme context
├── firebase/            # Firebase config
├── hook/                # Custom React hooks
├── utils/               # Utility functions
├── App.jsx              # Root component
├── main.jsx             # Entry point
└── index.css            # Global styles
```

## Usage

### Recording Audio

1. Click the recording button on the Home page
2. Grant microphone permissions
3. Speak your content
4. Click stop to finish recording
5. Click save to store in library

### Managing Recordings

- Navigate to **Library** to view all recordings
- Filter by "All", "Recent", or "Oldest"
- Expand cards to play, share, or download
- Delete recordings you no longer need

### Sharing

Select a recording and choose from:
- **WhatsApp** - Send via WhatsApp
- **Twitter** - Share to Twitter
- **Email** - Send via email
- **Copy Link** - Copy to clipboard
- **Download** - Save as MP3 file

### Authentication

- Sign up with email and password
- Or sign in with Google account
- Profile dropdown in navbar shows user settings and logout

## Browser Support

- Chrome/Chromium (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized build: **476.59 kB** JS (gzipped: 152.66 kB)
- CSS: **32.87 kB** (gzipped: 6.08 kB)
- Fast initial load with 2-second splash screen
- Smooth page transitions

## Dark Mode

Toggle between dark and light themes using the theme switcher in the navbar. All components automatically adapt to the selected theme with improved text contrast and readability.

## License

MIT

## Support

For issues or questions, use the contact form in the app's footer or visit the support page..
