



let usuarios=[];
let nUsers=0;
let user, userID, channelID, message, bot;


//la funcion inicio actua de constructor para el programa
exports.main=function inicio(u, uID, cID, m, b) {
    if(uID!==b.id) {
        user = u;
        userID = uID;
        channelID = cID;
        message = m;
        bot = b;
        main();
    }
};

//la funcion main redirige a los otros metodos segun el usuario, el estado y la entrada
function main() {





}

