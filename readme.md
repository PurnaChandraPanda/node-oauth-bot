It is true that there is no out of box support for pulling email id information in Teams channel (as compared to SfB channel). So, would have to go through custom code exercise to get "user" info pulled.


## Command line exercise

```
E:\BotSamples\nodejs-oauth-bot>npm init
This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg>` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
package name: (nodejs-oauth-bot)
version: (1.0.0)
description: oauth test for node.js bot
entry point: (index.js)
test command:
git repository:
keywords:
author:
license: (ISC)
About to write to E:\BotSamples\nodejs-oauth-bot\package.json:

{
  "name": "nodejs-oauth-bot",
  "version": "1.0.0",
  "description": "oauth test for node.js bot",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC"
}


Is this ok? (yes)
```

```
E:\BotSamples\nodejs-oauth-bot>npm install --save botbuilder@3.15.0
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN nodejs-oauth-bot@1.0.0 No repository field.

+ botbuilder@3.15.0
added 86 packages in 8.835s
```

```
E:\BotSamples\nodejs-oauth-bot>npm install --save restify

> dtrace-provider@0.8.7 install E:\BotSamples\nodejs-oauth-bot\node_modules\dtrace-provider
> node-gyp rebuild || node suppress-error.js


E:\BotSamples\nodejs-oauth-bot\node_modules\dtrace-provider>if not defined npm_config_node_gyp (node "C:\Program Files\nodejs\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" rebuild )
Building the projects in this solution one at a time. To enable parallel build, please add the "/m" switch.
npm WARN nodejs-oauth-bot@1.0.0 No repository field.

+ restify@7.2.1
added 63 packages in 11.154s
```


E:\BotSamples\nodejs-oauth-bot>code .

E:\BotSamples\nodejs-oauth-bot>


Now, create your app.js and add the logic.

## .env update
```
PS E:\BotSamples\nodejs-oauth-bot> npm install dotenv --save
npm WARN nodejs-oauth-bot@1.0.0 No repository field.

+ dotenv@6.1.0
added 1 package in 1.688s
```

## Teams package for botbuilder
```
E:\BotSamples\nodejs-oauth-bot>npm install --save botbuilder-teams
npm WARN deprecated crypto@1.0.1: This package is no longer supported. It's now a built-in Node module. If you've depended on crypto, you should switch to the one that's built-in.
npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
npm WARN nodejs-oauth-bot@1.0.0 No repository field.

+ botbuilder-teams@0.2.3
added 38 packages and updated 6 packages in 5.004s
```

## Output

"botbuilder-teams" is an extension to "botbuilder" package. So, it is perfectly safe to be used along with other channels. For MS Teams specific channel, you can have your explicit check.

```javascript
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
```

==

```javascript
bot.dialog('*:FetchMembersList', function (session) {
    var conversationId = session.message.address.conversation.id;
    connector.fetchMembers(session.message.address.serviceUrl, conversationId, function (err, result) {
        if (err) {
            session.endDialog('There is some error');
        }
        else {
            session.endDialog('%s', JSON.stringify(result));
        }
    });
});
```

It would return as:
```
[{
    "id":"29:181ma8aIlS30LnNNlX_qYy3NPmNCk3UFhApZX41a6w9If7xI2zOIBTvf1EEmu1M_zi-ICcNaxHxNFcUDOl-XqTQ",
    "objectId":"158ae709-8052-4ebd-afc0-6f64211b3fdf",
    "name":"Purna Chandra Panda",
    "givenName":"Purna Chandra",
    "surname":"Panda",
    "email":"pupanda@microsoft.com",
    "userPrincipalName":"pupanda@microsoft.com"
}]
```

```javascript
bot.dialog('*:FetchMembersList', function (session) {
    var conversationId = session.message.address.conversation.id;
    connector.fetchMembers(session.message.address.serviceUrl, conversationId, function (err, result) {
        if (err) {
            session.endDialog('There is some error');
        }
        else {
            session.endDialog('Email Address: %s', result[0].email);
        }
    });
});
```

It would return as:
```
Email Address: pupanda@microsoft.com
```

## Resources

Read the following for more clarity:
* https://stackoverflow.com/questions/49915313/how-to-get-user-email-by-id-on-microsoft-bot-framework
* https://docs.microsoft.com/en-us/microsoftteams/platform/concepts/bots/bots-context#nodejs-example
* https://github.com/OfficeDev/BotBuilder-MicrosoftTeams/blob/master/Node/samples/app.js

