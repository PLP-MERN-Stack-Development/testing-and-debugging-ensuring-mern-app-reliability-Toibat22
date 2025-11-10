// server/tests/setup.js
process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.env.NODE_ENV = 'test';
