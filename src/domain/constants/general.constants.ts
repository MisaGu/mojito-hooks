export const config = {
  CONTENTFUL_URL:
    'https://graphql.contentful.com/content/v1/spaces/fu9did2d8yaw/environments/staging' ||
    process.env.CONTENTFUL_URL ||
    '',
  CONTENTFUL_AUTH_TOKEN:
    '19vUSnF3_8S-OsepxXBcDAI_Ua3GbwSy5c7HNTXB-R0' || process.env.CONTENTFUL_AUTH_TOKEN || '',
  MOJITO_API_URL: 'https://api-dev.mojito.xyz/query' || process.env.MOJITO_API_URL || '',
  INVOICE_URL: 'https://sothebys.dev.mojito.xyz/invoice' || process.env.INVOICE_URL || '',
  MARKETPLACE_ID: 'd15b1b02-3c87-434d-a7fb-004b27415fbc' || process.env.MARKETPLACE_ID || '',
  ORGANIZATION_ID: 'a1dc174d-abf4-47d3-be3c-9281c6eba456' || process.env.ORGANIZATION_ID || '',
  AUTH0_DOMAIN: 'https://accounts.staging.sothelabs.com' || process.env.AUTH0_DOMAIN || '',
  AUTH0_CLIENTID: 'thTFyyXuq94Zr6nBIfEVnQ5iUwRlJsSg' || process.env.AUTH0_CLIENTID || '',
  AUTH_REDIRECT_URI: 'http://localhost:3000' || process.env.AUTH_REDIRECT_URI || '',
};
