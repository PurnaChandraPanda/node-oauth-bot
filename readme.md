## Command line exercise

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

E:\BotSamples\nodejs-oauth-bot>npm install --save botbuilder@3.15.0
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN nodejs-oauth-bot@1.0.0 No repository field.

+ botbuilder@3.15.0
added 86 packages in 8.835s

E:\BotSamples\nodejs-oauth-bot>npm install --save restify

> dtrace-provider@0.8.7 install E:\BotSamples\nodejs-oauth-bot\node_modules\dtrace-provider
> node-gyp rebuild || node suppress-error.js


E:\BotSamples\nodejs-oauth-bot\node_modules\dtrace-provider>if not defined npm_config_node_gyp (node "C:\Program Files\nodejs\node_modules\npm\node_modules\npm-lifecycle\node-gyp-bin\\..\..\node_modules\node-gyp\bin\node-gyp.js" rebuild )  else (node "C:\Program Files\nodejs\node_modules\npm\node_modules\node-gyp\bin\node-gyp.js" rebuild )
Building the projects in this solution one at a time. To enable parallel build, please add the "/m" switch.
npm WARN nodejs-oauth-bot@1.0.0 No repository field.

+ restify@7.2.1
added 63 packages in 11.154s

E:\BotSamples\nodejs-oauth-bot>code .

E:\BotSamples\nodejs-oauth-bot>

## Create your app.js and add the logic

## .env update
PS E:\BotSamples\nodejs-oauth-bot> npm install dotenv --save
npm WARN nodejs-oauth-bot@1.0.0 No repository field.

+ dotenv@6.1.0
added 1 package in 1.688s

