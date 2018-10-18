var restify = require('restify');
var builder = require('botbuilder');
require('dotenv').config();

// Setup restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, 
    function(){
        console.log('%s listening to %s', server.name, server.url);
    });

// Bot Storage: Here we register the state storage for your bot. 
// Default store: volatile in-memory store - Only for prototyping!
// We provide adapters for Azure Table, CosmosDb, SQL Azure, or you can implement your own!
// For samples and documentation, see: https://github.com/Microsoft/BotBuilder-Azure
var inMemoryStorage = new builder.MemoryBotStorage();

// Chat connector for communicating with Bot Framework service
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Respond to user requests
var bot = new builder.UniversalBot(connector, function(session){
    session.send("You said: %s", session.message.text);
})
.set('storage', inMemoryStorage);