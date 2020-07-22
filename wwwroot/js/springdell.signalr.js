const connection = new signalR.HubConnectionBuilder()
    .withUrl("/appsockethub")
    .configureLogging(signalR.LogLevel.Information)
    .build();
var cld = 0, rcd = 0;
connection.start().then(function () {
    try {
        signalR.registerEvents(connection);
        conn.on("ServiceOutput", function (d, t) {
            t(d);
        }); ehf
    }
    catch (e) {
        console.log("Please implement signalR.registerEvents(conn) in your own client script.");
    }
}).catch(function (err) { return console.error(err.toString()); });

var signalR = {
    registerEvents: function (conn) {
        conn.invoke("ServiceCall", "create/ADBI-19", "test", "test");
        
    }
}