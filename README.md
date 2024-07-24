# Tasmi' App

Tasmi' App is an application designed to provide easy access to Quranic recitations. Listen to various reciters, download surahs, and enhance your Quranic experience.

## Features

- Listen to Quranic recitations
- Multiple reciters available
- Prayer times information
- Download surahs for offline listening (coming soon)

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/mfaishal82/murattal-quran.git
   cd murattal-quran
   ```

2. Install dependencies:

   ```bash
   cd server
   npm install
   ```

   ```bash
   cd client
   npm install
   ```

3. Start the app:

   ```bash
   cd client
   npx expo start
   ```

### Running on Different Platforms

In the output, you'll find options to open the app in a:

- [Development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

### Project Structure

The main directories and files in this project are:

- `client/app`: Contains the main application code.
- `server`: Contains the backend code.
- `client/scripts`: Contains utility scripts.

### Configuration

The app configuration is managed in the `client/app.json` file. Ensure to update the necessary fields such as `name`, `slug`, `version`, and `icon`.

### Environment Variables

Set up your environment variables in the `server/config/config.json` file for different environments (development, test, production).

### API Endpoints

The backend server provides the following API endpoints:

- `POST /auth/login`: User login
- `POST /auth/register`: User registration

Refer to the backend code for more details on the API implementation.