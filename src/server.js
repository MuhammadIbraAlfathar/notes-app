// Membuat Web Server dengan framework Hapi
const hapi = require("@hapi/hapi");
const routes = require("./routes");

const init = async () => {
  const server = hapi.Server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server Berjalan Pada ${server.info.uri}`);
};

init();
