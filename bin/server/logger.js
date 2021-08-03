var fs = require('fs');

var logger = [{
  levels: {
    trace: 0,
    debug: 1,
    info: 2,
    warn: 3,
    crit: 4,
    fatal: 5
  },
}];

logger.log = function (level = 0, msg, classe = "Undefinied") {
    let dt = new Date();
    let strDate = dt.getDate()+"/"+dt.getMonth()+"/"+dt.getFullYear()+" "+dt.getHours()+":"+dt.getMinutes()+": Level: "+level+"\nClasse: "+classe+"\n";
    fs.appendFile("./logs/"+dt.getDate(), strDate+msg+"\n\n", function(err) {
        if(err) {
            return console.log(err);
        }

        console.log("The file was saved!");
    }); 
};

module.exports = logger;