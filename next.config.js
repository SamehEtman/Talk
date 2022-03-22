const { i18n } = require('./next-i18next.config');
module.exports = {
  i18n,
  reactStrictMode: true,
  
  images: {
    domains: [
      'www.w3schools.com',
      'upload.wikimedia.org',
      'commons.wikimedia.org',
      'static.wikia.nocookie.net',
      'en.wikipedia.org',
      'via.placeholder.com',
    ],
  },
};
