# VibeStage - Question Submission and Upvoting System

A realtime question submission and upvoting system for conferences and workshops, built with Next.js and Firebase.

## Features

- Question submission with title and description
- Realtime question updates
- Upvoting system
- Moderator controls to mark questions as answered
- Sorting by newest or most popular
- User-specific views

## Firebase Setup

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password and/or Google providers
3. Create a Firestore database
4. Enable Firebase Hosting
5. Add the Firebase configuration to your environment variables (see below)

## Development Setup

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Create a `.env.local` file with your Firebase configuration:

```
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

4. Run the development server:

```bash
bun run dev
```

## Deployment

1. Install Firebase CLI: `bun add -g firebase-tools`
2. Login to Firebase: `firebase login`
3. Initialize Firebase: `firebase init`
4. Build your Next.js app: `bun run build`
5. Export the static site: `bun run export` (or use `bunx next export`)
6. Deploy to Firebase: `firebase deploy`

Alternatively, set up the GitHub Actions workflow for automatic deployment on push to the main branch.

## Firebase App Hosting

This project includes a configuration for Firebase App Hosting. The `apphosting.yaml` file contains the necessary configuration for deploying to Firebase with environment variables and secrets.

## Project Structure

```
├── .github/workflows    # GitHub Actions workflows
│   └── firebase-deploy.yml  # Automatic deployment to Firebase
├── app/                 # Next.js application code
├── lib/                 # Shared utilities and services
│   ├── firebase.js      # Firebase initialization
│   ├── models.ts        # TypeScript interfaces
│   └── questionService.ts # Firebase operations for questions
├── public/              # Static assets
├── .firebaserc          # Firebase project configuration
├── apphosting.yaml      # Firebase App Hosting configuration
├── firebase.config.js   # Firebase client configuration
├── firebase.json        # Firebase hosting configuration
├── firestore.indexes.json # Firestore index configuration
├── firestore.rules      # Firestore security rules
└── storage.rules        # Firebase Storage security rules
```

## License

MIT 