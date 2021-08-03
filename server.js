const app = require(__dirname + "/bin/server/server");
const socketio = require(__dirname+"/bin/server/socket");
const port = process.env.PORT || 5555;

const server = app.listen(port, function() {
  console.log("Server online --" + port);
});
socketio.lister(server);