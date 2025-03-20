import { createApiBuilderFromCtpClient } from '@commercetools/platform-sdk';
import { ClientBuilder } from '@commercetools/sdk-client-v2';

// Get environment variables with fallbacks and type assertions to avoid TypeScript errors
const projectKey = process.env.NEXT_PUBLIC_CTP_PROJECT_KEY || '';
const authUrl = process.env.NEXT_PUBLIC_CTP_AUTH_URL || '';
const apiUrl = process.env.NEXT_PUBLIC_CTP_API_URL || '';
const clientId = process.env.CTP_CLIENT_ID || '';
const clientSecret = process.env.CTP_CLIENT_SECRET || '';
const scopeValue = process.env.NEXT_PUBLIC_CTP_SCOPE || '';

// Define scopes array properly
const scopes = scopeValue ? [scopeValue] : [];

// Determine if we're running on the server or client
const isServer = typeof window === 'undefined';

// Create client with appropriate flow based on environment
let ctpClient;

if (isServer) {
  // Server-side: Use client credentials flow (has access to secrets)
  ctpClient = new ClientBuilder()
    .withClientCredentialsFlow({
      host: authUrl,
      projectKey,
      credentials: {
        clientId,
        clientSecret,
      },
      scopes,
    })
    .withHttpMiddleware({
      host: apiUrl,
    })
    .build();
} else {
  // Client-side: Use a limited anonymous flow (no secrets)
  ctpClient = new ClientBuilder()
    .withAnonymousSessionFlow({
      host: authUrl,
      projectKey,
      credentials: {
        clientId: process.env.NEXT_PUBLIC_CTP_CLIENT_ID || '',
        clientSecret: '', // Empty on client side
      },
      scopes,
    })
    .withHttpMiddleware({
      host: apiUrl,
    })
    .build();
}

// Create the API root
const apiRoot = createApiBuilderFromCtpClient(ctpClient).withProjectKey({ projectKey });

// Export both the new apiRoot approach and the legacy getRequestBuilder for compatibility
export { apiRoot };
export default ctpClient;