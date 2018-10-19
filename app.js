var restify = require('restify');
var builder = require('botbuilder');
var teams = require('botbuilder-teams');
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
// var connector = new builder.ChatConnector({
//    appId: process.env.MICROSOFT_APP_ID,
//    appPassword: process.env.MICROSOFT_APP_PASSWORD
// });
var connector = new teams.TeamsChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Respond to user requests
// ********* basic flow of user requests *****************
// Prepare UniversalBot for basic information return
// var bot = new builder.UniversalBot(connector, function(session){
//      session.send("You said: %s", session.message.text);
// })
// .set('storage', inMemoryStorage);

// Prepare UnversalBot for teams related activities
var bot = new builder.UniversalBot(connector)
            .set('storage', inMemoryStorage);

bot.dialog('/', [
    function(session){
        if(session.message.source==='msteams'){
            builder.Prompts.choice(session, "Choose an option: ", 
                    'Fetch channel list|FetchMembersList|FetchTeamInfo(at Bot in team');        
        }
        else{
            session.send("Test is not for your channel. You said: %s", session.message.text);
        }
    },
    function(session, results){
        switch(results.response.index){
            case 0:
                session.beginDialog('FetchChannelList');
                break;
            case 1:
                session.beginDialog('FetchMembersList');
                break;
            case 2:
                session.beginDialog('FetchTeamInfo');
                break;
            default:
                session.endDialog();
                break;
        }
    }
]);

bot.dialog('FetchChannelList', function(session){
    var teamId = session.message.sourceEvent.team.id;
    connector.fetchChannelList(session.message.address.serviceUrl, teamId, function (err, result) {
        if (err) {
            session.endDialog('There is some error');
        }
        else {
            session.endDialog('%s', JSON.stringify(result));
        }
    });
});

bot.dialog('*:FetchMembersList', function (session) {
    var conversationId = session.message.address.conversation.id;
    connector.fetchMembers(session.message.address.serviceUrl, conversationId, function (err, result) {
        if (err) {
            session.endDialog('There is some error');
        }
        else {
            //session.endDialog('%s', JSON.stringify(result));
            session.endDialog('Email Address: %s', result[0].email);
        }
    });
});

bot.dialog('*:FetchTeamInfo', function (session) {
    var teamId = session.message.sourceEvent.team.id;
    connector.fetchTeamInfo(session.message.address.serviceUrl, teamId, function (err, result) {
        if (err) {
            session.endDialog('There is some error');
        }
        else {
            session.endDialog('%s', JSON.stringify(result));
        }
    });
});

