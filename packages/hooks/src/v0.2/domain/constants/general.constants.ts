export const config = {
  CONTENTFUL_URL: process.env.CONTENTFUL_URL || '',
  CONTENTFUL_AUTH_TOKEN: process.env.CONTENTFUL_AUTH_TOKEN,
  MOJITO_API_URL: process.env.MOJITO_API_URL || '',
  INVOICE_URL: process.env.INVOICE_URL || '',
  ORGANIZATION_ID: process.env.API_ORGANIZATION_ID || '8fb128bd-f55d-4bcc-8b6c-0beb684e4d4e',
  MARKETPLACE_ID: process.env.MARKETPLACE_ID || 'c5ac4f84-b78b-4cb7-a24f-7f0c38da0eb2',
  TEST_ENV: process.env.TEST_ENV || '',
  AUTH0_DOMAIN: process.env.AUTH0_DOMAIN || '',
  AUTH0_CLIENTID: process.env.AUTH0_CLIENTID || '',
  AUTH_REDIRECT_URI: process.env.AUTH_REDIRECT_URI || '',
};
