const Hapi = require('hapi');
const Vision = require('vision');
const Inert = require('inert');
const Handlebars = require('handlebars');
const Fs = require('fs');

const server = new Hapi.Server();


// server.connection({
//   port: process.env.PORT || 4000
// });

var tls = {
  key : Fs.readFileSync('keys/key.pem'),
  cert : Fs.readFileSync('keys/cert.pem')
};

server.connection({address: '0.0.0.0', port: process.env.PORT || 4000, tls : tls});

server.register(Vision, (err) => {
  if (err) throw err;

  server.views({
    engines: {
      html: Handlebars
    },
    path: 'views',
    layoutPath: 'views/layout',
    layout: 'layout',
    partialsPath: 'views/partials'
  });

  server.route({
    path: '/',
    method: 'GET',
    handler: (request, reply) => reply.view('index', {})
  });

  server.route({
    path: '/get-started',
    method: 'GET',
    handler: (request, reply) => reply.view('get-started', {})
  });

  server.route({
    path: '/postcode',
    method: 'GET',
    handler: (request, reply) => reply.view('postcode', {})
  });

  server.route({
    path: '/location',
    method: 'GET',
    handler: (request, reply) => reply.view('location', {})
  });

  server.route({
    path: '/times',
    method: 'GET',
    handler: (request, reply) => reply.view('times', {})
  });

  server.route({
    path: '/summary',
    method: 'GET',
    handler: (request, reply) => reply.view('summary', {})
  });

  server.route({
    path: '/confirmation',
    method: 'GET',
    handler: (request, reply) => reply.view('confirmation', {})
  });
});

server.register(Inert, (err) => {
  if (err) throw err;

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  })
});

module.exports = server;
