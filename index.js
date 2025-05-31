const net = require('net');
const {DB} = require('./db');

const HOST = 'localhost';
const PORT = 25565;

const client = new net.Socket();
const myDB = new DB(['change','timestap'])
setInterval(()=>{
    client.connect(PORT, HOST, () => {
        client.write(
            Buffer.from(
                '150082060e3139322e3136382e3137382e323363dd010100', //my access buffer (with home ip) don't change server.jar ignores it
                'hex'
            )
        )
    });
},1000*3)

const runtime = {
    prev:null,
    next:null,
}
function compair(thisjson){
    runtime.next=thisjson;
    if(runtime.next==runtime.prev){
        return;
    }else{
        myDB.insert([JSON.stringify(thisjson),new Date().toUTCString()])
    }
    runtime.prev=thisjson;
}
client.on('data', (data) => {
    const str = data.toString().slice(5)
    const myjson = JSON.parse(str)
    console.log(myjson.players)
    compair(myjson.players.sample);
    client.destroy()
});

client.on('error', (err) => {
    console.error('Fehler:', err.message);
});
