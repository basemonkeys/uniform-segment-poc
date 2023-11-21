/** @type {import('@uniformdev/canvas-next-rsc/config').UniformServerConfig} */
module.exports = {
  defaultConsent: true,
  plugins: [enableContextDevTools()],
  evaluation: {
    personalization: 'client',
    testing: 'client'
  }
};
