# The Witcher Library - E-commerce Microsite

A Next.js microsite for selling The Witcher series books, integrated with Commercetools for backend functionality.

## Features

- Witcher-themed design with custom styling
- Commercetools integration for product catalog
- Cart functionality with state management
- Checkout process (without payment integration)
- Responsive design for all devices

## Prerequisites

- Node.js 18.x or higher
- npm or yarn
- Commercetools account with API credentials
- Product Selection with Witcher books (Selection key: "witcher" or ID: "c596663f-797e-44b5-993a-d0ae6f5108e4")

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Set up environment variables:
   - Create a `.env.local` file based on the `.env.local.example`
   - Fill in your Commercetools project credentials

4. Add required images to the `public` folder:
   - `witcher-banner.jpg` - Banner image for the site
   - `witcher-books.jpg` - Image of the book collection
   - `book-placeholder.jpg` - Placeholder for books without images

5. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - Reusable UI components
- `/src/context` - React context providers (cart state)
- `/src/lib` - Utility functions and API integrations

## Commercetools Setup

This microsite requires the following setup in your Commercetools project:

1. A Product Selection with key "witcher" containing Witcher series books
2. A Shipping Method with ID "767b2262-41e8-dfb-84f3-ccb720edfb34"
3. Products with proper localization (en-AU or en)

## Deployment

This project can be deployed on Vercel or any other hosting service that supports Next.js applications:

```bash
npm run build
# or
yarn build
```

## Environment Variables

The following environment variables are required:

- `NEXT_PUBLIC_CTP_PROJECT_KEY` - Your Commercetools project key
- `NEXT_PUBLIC_CTP_AUTH_URL` - Commercetools auth URL
- `NEXT_PUBLIC_CTP_API_URL` - Commercetools API URL
- `CTP_CLIENT_ID` - Your client ID
- `CTP_CLIENT_SECRET` - Your client secret
- `NEXT_PUBLIC_CTP_SCOPE` - API access scope

## License

This project is for demonstration purposes only. The Witcher is a registered trademark of Andrzej Sapkowski.