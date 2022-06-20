export const config = {
  CONTENTFUL_URL:
    'https://graphql.contentful.com/content/v1/spaces/fu9did2d8yaw/environments/staging' ||
    process.env.CONTENTFUL_URL ||
    '',
  CONTENTFUL_AUTH_TOKEN:
    '19vUSnF3_8S-OsepxXBcDAI_Ua3GbwSy5c7HNTXB-R0' || process.env.CONTENTFUL_AUTH_TOKEN || '',
  MOJITO_API_URL: 'https://api-dev.mojito.xyz/query' || process.env.MOJITO_API_URL || '',
  INVOICE_URL: 'https://sothebys.dev.mojito.xyz/invoice' || process.env.INVOICE_URL || '',
  MARKETPLACE_ID: 'c5ac4f84-b78b-4cb7-a24f-7f0c38da0eb2' || process.env.MARKETPLACE_ID || '',
  ORGANIZATION_ID: '8fb128bd-f55d-4bcc-8b6c-0beb684e4d4e' || process.env.ORGANIZATION_ID || '',
  AUTH0_DOMAIN: 'https://accounts.staging.sothelabs.com' || process.env.AUTH0_DOMAIN || '',
  AUTH0_CLIENTID: 'thTFyyXuq94Zr6nBIfEVnQ5iUwRlJsSg' || process.env.AUTH0_CLIENTID || '',
  AUTH_REDIRECT_URI: 'http://localhost:3000' || process.env.AUTH_REDIRECT_URI || '',
};
