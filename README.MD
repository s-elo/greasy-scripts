## Development env for Greasy scripts

### add path to the Tampermonkey

create a new script and add the following comments

```js
// ==UserScript==
// @name         your script name
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        *://*/*
// @require      https://unpkg.com/react@17/umd/react.production.min.js
// @require      https://unpkg.com/react-dom@17/umd/react-dom.production.min.js
// @require      file://your root path\dist\your script name.js
// @icon         https://www.google.com/s2/favicons?sz=64&domain=screeps.com
// @grant        none
// ==/UserScript==
```

### start the dev server

```bash
yarn dev
```

it will open a index.html for testing the script with HUM

## Ghrome plugins

at plugins folder
