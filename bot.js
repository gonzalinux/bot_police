let Discord = require('discord.js');
let logger = require('winston');
let auth = require('./auth.json');

let fs=require("fs")
let path=require("path")

let diccionario=fs.readFileSync(path.join(__dirname,"diccionario.txt")).toString().split(";")

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console);
logger.level = 'debug';
//Iniciar el bot
let client = new Discord.Client();
client.login(auth.token).then(()=>{console.log("Se ha usado el token")});



client.on('ready', function (evt) {
    console.log('Connected');
    console.log('Logged in as: ');
    console.log(client.user.username+ ' - (' + client.user.id + ')');
});
client.on('message', function (mensaje) {
    // el evento de encender al recibir mensaje lanza las funciones principales del otro archivo

   let func=require("./Funciones");
   //func.main(user,userID,channelID,message,bot);
    if(mensaje.author.bot){
        return 0
    }
    if(mensaje.content.startsWith("HornyP")){
        prefix(mensaje)
        return 0
    }
    let channel=mensaje.channel;
    let palabra=comprobarpalabra(mensaje.content)
    if(palabra!=="false")
        channel.send("la palabra baneada es: "+palabra)
    let autor=mensaje.author
    let guild=mensaje.guild



});


function comprobarpalabra(cadena){
    cadena=cadena.split(" ");
    for(let i=0;i<diccionario.length;i++){
        let tamano=diccionario[i].length;
        for(let j=0;j<cadena.length;j++){
            if(cadena[j].toLowerCase()===diccionario[i])
                return diccionario[i]
        }
    }
    return "false"
}

function prefix(mensaje){
    let texto=mensaje.content.toString();

    texto=texto.substring(6,texto.length)
    texto=texto.trim()
    console.log(texto)
    texto=texto.split(" ")
    switch (texto[0]){
        case "add": if(mensaje.member.hasPermission("ADMINISTRATOR")){
            if (texto[1] !== undefined) {
                fs.appendFileSync(path.join(__dirname, "diccionario.txt"), ";" + texto[1].toLowerCase())
                diccionario.push(texto[1].toLowerCase())
                mensaje.channel.send("Se ha añadido '" + texto[1] + "' a las palabras baneables")
            }
        }else mensaje.channel.send(mensaje.author.username+" deja ya la tonteria")


    }




}