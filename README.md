# Meta Webhook API

A serverless webhook API built with Express.js and AWS Lambda for handling Meta (Facebook) webhook events.

## Features

- **Webhook Verification**: Handles Meta webhook subscription verification
- **Serverless Architecture**: Built with AWS Lambda for scalability
- **Express.js Backend**: Clean and maintainable API structure
- **Environment Configuration**: Secure token management

## Prerequisites

- Node.js (v14 or higher)
- Vercel CLI installed globally (`npm i -g vercel`)
- Git repository

## Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd boilerplate-meta-webhook
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your actual TOKEN value
```

## Environment Variables

### Local Development
Create a `.env` file in the root directory:

```env
TOKEN=your_webhook_verification_token_here
```

### Vercel Deployment
Set environment variables in your Vercel project:

1. **Via Vercel Dashboard (Recommended)**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Select your project
   - Go to **Settings** tab
   - Click on **Environment Variables** in the left sidebar
   - Click **Add New** button
   - Set **Name**: `TOKEN`
   - Set **Value**: `your_webhook_verification_token_here`
   - Select **Environments**: Choose Production, Preview, and/or Development
   - Click **Save**
   - **Important**: After adding environment variables, you may need to redeploy your project

2. **Via Vercel CLI** (Alternative method):
```bash
vercel env add TOKEN
# Enter your token value when prompted
```

3. **Environment-specific variables via CLI**:
   - Production: `vercel env add TOKEN production`
   - Preview: `vercel env add TOKEN preview`
   - Development: `vercel env add TOKEN development`

## Usage

### Local Development

Run the application locally:

```bash
npm run dev
```

The API will be available at `http://localhost:3000`

### API Endpoints

#### GET `/`
Welcome endpoint that provides API information.

**Response:**
```json
{
  "message": "Welcome to the Meta Webhook API",
  "status": "active",
  "endpoints": {
    "webhook": "/webhooks"
  }
}
```

#### GET `/webhooks`
Meta webhook verification endpoint.

**Query Parameters:**
- `hub.mode`: Must be "subscribe"
- `hub.verify_token`: Must match your configured TOKEN
- `hub.challenge`: Challenge string from Meta

**Response:**
- Success: Returns the challenge string
- Failure: Returns HTTP 400 status

### Deployment

Deploy to Vercel:

1. **Install Vercel CLI** (if not already installed):
```bash
npm i -g vercel
```

2. **Deploy to Vercel**:
```bash
vercel
```

3. **Follow the prompts**:
   - Link to existing project or create new one
   - Set your project name
   - Choose your team/account
   - Confirm deployment settings

4. **For production deployment**:
```bash
vercel --prod
```

5. **Set environment variables in Vercel Dashboard**:
   - Go to your project in [Vercel Dashboard](https://vercel.com/dashboard)
   - Navigate to Settings → Environment Variables
   - Add `TOKEN` with your webhook verification token value
   - Redeploy if needed

## Project Structure

```
├── app.js              # Main Express application
├── package.json        # Dependencies and scripts
├── .env               # Environment variables for local development
├── vercel.json        # Vercel configuration (auto-generated)
└── README.md          # This file
```

## Meta Webhook Setup

1. **Create a Meta App**: Go to [Meta for Developers](https://developers.facebook.com/)
2. **Configure Webhooks**: Add your webhook URL in the app settings
3. **Set Verification Token**: Use the same token as your `TOKEN` environment variable
4. **Subscribe to Events**: Choose which events you want to receive

## Development

### Adding New Endpoints

To add new webhook endpoints, modify `app.js`:

```javascript
app.post('/webhooks', (req, res) => {
  // Handle incoming webhook events
  const body = req.body;
  
  // Process the webhook data
  console.log('Webhook received:', body);
  
  res.sendStatus(200);
});
```

### Testing

Test your webhook locally using tools like:
- [ngrok](https://ngrok.com/) for exposing localhost
- [Postman](https://www.postman.com/) for API testing
- [Facebook Webhook Tester](https://developers.facebook.com/tools/echo/)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues and questions:
- Check the [Meta Webhook Documentation](https://developers.facebook.com/docs/graph-api/webhooks)
- Review the [Vercel Documentation](https://vercel.com/docs)
- Open an issue in this repository

## Changelog

### v1.0.0
- Initial webhook verification endpoint
- Welcome route for API information
- Vercel deployment configuration
