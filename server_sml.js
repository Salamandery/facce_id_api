const app = require(__dirname + "/bin/server/server_sml");
const socketio = require(__dirname + "/bin/server/socket");
const port = process.env.NODE_ENV;

const server = app.listen(port, function() {
  console.log("Server online --");
});
socketio.lister(server);
