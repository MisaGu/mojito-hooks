import 'jest-extended';

console.error = (msg) => {
  throw new Error(msg);
};

process.env.CONTENTFUL_URL = 'https://graphql.contentful.com/test';
process.env.CONTENTFUL_AUTH_TOKEN = 'contentful-test';
process.env.MOJITO_API_URL = 'https://api.dev.mojito.xyz/query';
process.env.INVOICE_URL = 'https://api.dev.mojito.xyz/invoice';
process.env.MARKETPLACE_ID = 'marketplace-test';
process.env.TEST_ENV = 'test';
process.env.AUTH0_DOMAIN = 'test.auth0.com';
process.env.AUTH0_CLIENTID = 'auth0-test';
process.env.AUTH_REDIRECT_URI = 'http://localhost:3000/test';
