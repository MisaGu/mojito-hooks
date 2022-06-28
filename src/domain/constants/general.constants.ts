export const config = {
  CONTENTFUL_URL:
    'https://graphql.contentful.com/content/v1/spaces/fu9did2d8yaw/environments/staging' ||
    process.env.CONTENTFUL_URL ||
    '',
  CONTENTFUL_AUTH_TOKEN:
    '19vUSnF3_8S-OsepxXBcDAI_Ua3GbwSy5c7HNTXB-R0' || process.env.CONTENTFUL_AUTH_TOKEN || '',
  MOJITO_API_URL: 'https://api-dev.mojito.xyz/query' || process.env.MOJITO_API_URL || '',
  INVOICE_URL: 'https://sothebys.dev.mojito.xyz/invoice' || process.env.INVOICE_URL || '',
  MARKETPLACE_ID: '35e9a42d-3679-4824-80a7-56a2c82ad4c1' || process.env.MARKETPLACE_ID || '',
  ORGANIZATION_ID: '8fb128bd-f55d-4bcc-8b6c-0beb684e4d4e' || process.env.ORGANIZATION_ID || '',
  AUTH0_DOMAIN: 'https://accounts.staging.sothelabs.com' || process.env.AUTH0_DOMAIN || '',
  AUTH0_CLIENTID: 'thTFyyXuq94Zr6nBIfEVnQ5iUwRlJsSg' || process.env.AUTH0_CLIENTID || '',
  AUTH_REDIRECT_URI: 'http://localhost:3000' || process.env.AUTH_REDIRECT_URI || '',
};
