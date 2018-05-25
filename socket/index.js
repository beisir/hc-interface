module.exports = function (wss){
    wss.on('connection', function (ws) {
        ws.on('message', function (message) {
            message = JSON.parse(message)
            broadcast(message);
        });

        ws.on('error', function (err){
            try {
                console.log(err);
            } catch(e){
                console.log(e);
            }
        })
    });
    var obj = {};
    function broadcast(data) {
        console.log(data);
        var i = 0;
        wss.clients.forEach(function (client,index) {
            i ++;
            client.send(JSON.stringify({msg:data.msg, id:i, type:data.type}));
        });
        console.log(i);
    };
}
