let Discord = require('discord.js');
let logger = require('winston');
let auth = require('./auth.json');


let fs=require("fs")
let path=require("path")
let usuarios=fs.readFileSync(path.join(__dirname,"usuarios.txt")).toString().split(",")
for(let i=0;i<usuarios.length;i++){
    usuarios[i]=usuarios[i].split(":")

}
let diccionario=fs.readFileSync(path.join(__dirname,"diccionario.txt")).toString().split(",")
let bonks=["bonk/bonk.gif"]
fs.readdir(path.join(__dirname,"bonk"), function (err,archivos){
    if(!err){

        bonks=archivos
}

});
let rol_horny

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
    let autor=mensaje.author
    let guild=mensaje.guild
    rol_horny=guild.roles.fetch("778729551072067585")
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
    if(palabra!=="false") {
        let ima="./bonk/" + bonks[Math.trunc(Math.random()*bonks.length)]

        //ima=fs.readFileSync(ima)
        channel.send("la palabra baneada es: " + palabra + "\nte vas a la carcel pillin\ntienes 15 segundos para despedirte", {files:[ima] })
        setTimeout(()=>{mensaje.member.roles.add("778729551072067585").then(()=>{
            console.log("Se ha aplicado un rol")
            setTimeout(()=>{
                mensaje.member.roles.remove("778729551072067585").then(()=>{
                    console.log("Se ha eliminado un rol")
                })


            },5*60*1000)
        })},15000)
    }







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
    let comando=texto.split(" ")[0]
    texto=texto.substring(comando.length+1)
    switch (comando){
        case "add": if(mensaje.member.hasPermission("ADMINISTRATOR")){
            if (texto !== undefined) {
                if(diccionario.includes(texto)){
                    mensaje.channel.send("La palabra '" + texto + "' ya era una palabra baneada")

                }
                else {
                    fs.appendFileSync(path.join(__dirname, "diccionario.txt"), ";" + texto.toLowerCase())
                    diccionario.push(texto.toLowerCase())
                    mensaje.channel.send("Se ha añadido '" + texto + "' a las palabras baneables")
                }
            }
        }else mensaje.channel.send(mensaje.author.username+" deja ya la tonteria")
            break;
        case "lista":

            let palabras="Las palabras baneadas son:\n"
            for(let i=0;i<diccionario.length;i++){
            palabras+=diccionario[i]+"\n"
        }
            mensaje.channel.send(palabras);break;
        case "remove":
            if(diccionario.includes(texto)){
                diccionario.splice(diccionario.indexOf(texto),1)
                fs.writeFileSync("diccionario.txt", diccionario)
                mensaje.channel.send("Se ha eliminado la palabra '"+texto+"' de las palabras baneables")

            }

    }




}