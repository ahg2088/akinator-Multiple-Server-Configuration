const { Client, Intents } = require("discord.js");
const fse = require("fs-extra");
const fs = require("fs");
const akinator = require("discord.js-akinator");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

client.on("ready", () => {
    console.log("Bot is Online")
});

async function ExistConfig(server){
    var path = `./configs/${server}.json`;
    try {
        return fs.existsSync(path);
    } catch (e) {return false;}
}

async function CreateConfig(server){
    fse.outputFile(`./configs/${server}.json`, 
    `{"language": "es", 
    "childMode": "false", 
    "gameType": "character",
    "useButtons": "true", 
    "embedColor": "1F1E33"}`).then(() => {
        console.log(`Correcto`);
    }).catch(err => console.log(err));
}

client.on("messageCreate", async message => {
    const PREFIX = "!";
    if(message.content.toLowerCase().startsWith(`${PREFIX}akinator`)) {
        var server = message.guild.id;
        var tiene = await ExistConfig(server);
        if(!tiene){
            CreateConfig(server);
            const lenguajeDB = require(`./configs/${server}.json`);
            message.channel.send("Configuración creada, ejecute nuevamente el comando");
        } else{
            const serversDB = require(`./configs/${server}.json`);
            akinator(message, {
                language: serversDB.language, //Defaults to "en"
                childMode: serversDB.childMode, //Defaults to "false"
                gameType: serversDB.gameType, //Defaults to "character"
                useButtons: serversDB.useButtons, //Defaults to "false"
                embedColor: serversDB.embedColor //Defaults to "RANDOM"
            });
        }
    }
    if(message.content.toLowerCase().startsWith(`${PREFIX}setlenguaje`)) {
        var server = message.guild.id;
        var tiene = await ExistConfig(server);
        if(!tiene){
            CreateConfig(server);
            message.channel.send("Configuración creada, ejecute nuevamente el comando");
        } else{
            const agrs = message.content.split(" ")[1];
            const serversDB = require(`./configs/${server}.json`);
            if(agrs === "es" || agrs === "en" || agrs === "fr" || agrs === "de" || agrs === "it"){
                serversDB.language = agrs;
                fse.outputFile(`./configs/${server}.json`, JSON.stringify(serversDB)).then(() => {
                    console.log(`Correcto`);
                }).catch(err => console.log(err));
                message.reply("Lenguaje cambiado a: " + serversDB.language);
            } else {
                message.reply("No se reconoce el lenguaje, los lenguajes disponibles son: "+`\`es (español-Spanish)\``+" y "+`\`en (inglés-English)\``);	
            }

            //serversDB.language = message.content.split(" ")[1];
        }
    }
    if(message.content.toLowerCase().startsWith(`${PREFIX}setchildmode`)){
        var server = message.guild.id;
        var tiene = await ExistConfig(server);
        if(!tiene){
            CreateConfig(server);
            message.channel.send("Configuración creada, ejecute nuevamente el comando");
        } else{
            const agrs = message.content.split(" ")[1];
            const serversDB = require(`./configs/${server}.json`);
            if(agrs === "true" || agrs === "false"){
                serversDB.childMode = agrs;
                fse.outputFile(`./configs/${server}.json`, JSON.stringify(serversDB)).then(() => {
                    console.log(`Correcto`);
                }).catch(err => console.log(err));
                message.reply("Modo infantil cambiado a: " + serversDB.childMode);
            } else {
                message.reply("No se reconoce el modo, los modos disponibles son: "+`\`true\``+" y "+`\`false\``);	
            }
        }
    }
    if(message.content.toLowerCase().startsWith(`${PREFIX}setgametype`)){
        var server = message.guild.id;
        var tiene = await ExistConfig(server);
        if(!tiene){
            CreateConfig(server);
            message.channel.send("Configuración creada, ejecute nuevamente el comando");
        } else{
            const agrs = message.content.split(" ")[1];
            const serversDB = require(`./configs/${server}.json`);
            if(agrs === "character" || agrs === "animal" || agrs === "object"){
                serversDB.gameType = agrs;
                fse.outputFile(`./configs/${server}.json`, JSON.stringify(serversDB)).then(() => {
                    console.log(`Correcto`);
                }).catch(err => console.log(err));
                message.reply("Tipo de juego cambiado a: " + serversDB.gameType);
            } else {
                message.reply("No se reconoce el tipo, los tipos disponibles son: "+`\`character\``+" y "+`\`animal\``+" y "+`\`object\``);	
            }
        }
    }
    if(message.content.toLowerCase().startsWith(`${PREFIX}setusebuttons`)){
        var server = message.guild.id;
        var tiene = await ExistConfig(server);
        if(!tiene){
            CreateConfig(server);
            message.channel.send("Configuración creada, ejecute nuevamente el comando");
        } else{
            const agrs = message.content.split(" ")[1];
            const serversDB = require(`./configs/${server}.json`);
            if(agrs === "true" || agrs === "false"){
                serversDB.useButtons = agrs;
                fse.outputFile(`./configs/${server}.json`, JSON.stringify(serversDB)).then(() => {
                    console.log(`Correcto`);
                }).catch(err => console.log(err));
                message.reply("Botones cambiados a: " + serversDB.useButtons);
            } else {
                message.reply("No se reconoce el modo, los modos disponibles son: "+`\`true\``+" y "+`\`false\``);	
            }
        }
    }
    if(message.content.toLowerCase().startsWith(`${PREFIX}setembedcolor`)){
        var server = message.guild.id;
        var tiene = await ExistConfig(server);
        if(!tiene){
            CreateConfig(server);
            message.channel.send("Configuración creada, ejecute nuevamente el comando");
        } else{
            const agrs = message.content.split(" ")[1];
            const serversDB = require(`./configs/${server}.json`);
            if(agrs === "RANDOM" || agrs === "BLUE" || agrs === "GREEN" || agrs === "PURPLE" || agrs === "RED" || agrs === "YELLOW"){
                serversDB.embedColor = agrs;
                fse.outputFile(`./configs/${server}.json`, JSON.stringify(serversDB)).then(() => {
                    console.log(`Correcto`);
                }).catch(err => console.log(err));
                message.reply("Color cambiado a: " + serversDB.embedColor);
            } else {
                message.reply("No se reconoce el color, los colores disponibles son: "+`\`RANDOM\``+" y "+`\`BLUE\``+" y "+`\`GREEN\``+" y "+`\`PURPLE\``+" y "+`\`RED\``+" y "+`\`YELLOW\``);	
            }
        }
    }
    if(message.content.toLowerCase().startsWith(`${PREFIX}akihelp`)){
        message.channel.send(`
        **Comandos disponibles:**
        \`${PREFIX}akinator\`: Comando para jugar al akinator
        \`${PREFIX}setlanguage\`: Cambia el lenguaje del bot
        \`${PREFIX}setchildmode\`: Cambia el modo infantil del bot
        \`${PREFIX}setgametype\`: Cambia el tipo de juego del bot
        \`${PREFIX}setusebuttons\`: Cambia el uso de botones del bot
        \`${PREFIX}setembedcolor\`: Cambia el color del embed del bot
        `);
    }
});

client.login("Your token");
