const socketio = require("socket.io");
var os = 0;
module.exports.lister = (server) => {
    const io = socketio.listen(server);
    io.on("connection", () => console.log("Rodando....")); // pnl ok

    io.on("connection", function(socket) {
        console.log("Estacao conectada");
        socket.on("disconnect", function() {
            console.log("Estacao desconectada");
        });
        socket.on("reloadLei", function(msg) {
            io.emit("reloadLei", msg);
            console.log("message: " + msg);
        });
        socket.on("sol_os", function(msg) {
            os++;
            io.emit("solled_os", msg);
            console.log("message: " + msg + "os aberta: "+ os);
        });
    });
}   
module.exports.imitter = (msg) => {
}