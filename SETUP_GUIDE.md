# Environment Setup Guide

## Google OAuth Configuration

To fix the Google Sign-In 403 error, you need to configure your Google Client ID:

### Steps to Get Google Client ID:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Navigate to **APIs & Services** > **Credentials**
4. Click **Create Credentials** > **OAuth 2.0 Client ID**
5. Configure the OAuth consent screen if prompted
6. Choose **Web application** as the application type
7. Add authorized JavaScript origins:
   - `http://localhost:5173` (for development)
   - Your production domain (for production)
8. Add authorized redirect URIs:
   - `http://localhost:5173` (for development)
   - Your production domain (for production)
9. Click **Create** and copy the Client ID

### Configure the Environment Variables:

1. Open the `.env` file in the `client` directory
2. Replace `your-google-client-id-here` with your actual Google Client ID:
   ```
   VITE_GOOGLE_CLIENT_ID=your-actual-client-id.apps.googleusercontent.com
   ```
3. Save the file
4. Restart your development server

## Password Requirements

When registering, passwords must meet these requirements:
- At least 6 characters long
- Contains at least one uppercase letter (A-Z)
- Contains at least one lowercase letter (a-z)
- Contains at least one number (0-9)

Example valid passwords:
- `Password123`
- `SecurePass1`
- `MyP@ss123`

## Troubleshooting

### 403 Error on Google Sign-In
- Ensure your `.env` file has the correct Google Client ID
- Restart your development server after adding the Client ID
- Check that your domain is authorized in Google Cloud Console

### 400 Error on Registration
- Ensure your password meets all requirements (uppercase, lowercase, number)
- Check that your name only contains letters and spaces
- Verify your email is in a valid format
- Make sure all required fields are filled

### Server Not Running
- Ensure the backend server is running on port 8000
- Check MongoDB connection in the server
- Verify all environment variables are set in the server's `.env` file
