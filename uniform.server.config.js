/** @type {import('@uniformdev/canvas-next-rsc/config').UniformServerConfig} */
module.exports = {
  defaultConsent: true,
  plugins: [enableContextDevTools(),enableDebugConsoleLogDrain('debug')],
  evaluation: {
    personalization: 'client',
    testing: 'client'
  }
};
