import packageJson from '../../package.json';

export const environment = {
  production: false,
  publicApiEndpoint: 'https://animal-facts.cafo.dev/api/v1',
  internalApiEndpoint: 'http://localhost:8080/api/v1',
  // internalApiEndpoint: 'https://animal-facts-internal.cafo.dev/api/v1',
  auth0Domain: 'cafo.eu.auth0.com',
  auth0ClientId: 'DrDMHn1TPWS7Qy1cmTijg3emme5wZ0hO',
  auth0Audience: 'https://animal-facts-manager.cafo.dev/',
  version: packageJson.version,
};
