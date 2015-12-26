# node-async-require-loader

> Transparently `require()` remote contents (node moudles) in webpack !

## Why


## Usage
```
npm install --save node-async-require-loader
```

### Use directly in the js file. 
```js
require("node-async-require-loader!remote-content.ajs");

```

### Set up the webpack.config.js
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader"
        }]
    }
```

## Example

### Provide an .ajs file

Only write down the remote url that with contents(node moudle) you want to fetch. 
(.ajs extenion is only for loader to recognize the file) 
 
remote-content.ajs
```js
https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/
``` 

the contnets from the remote url are ..

```js
module.export=function(){ console.log("Hello World From Web"); };
```

### Set up the webpack.config.js
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader"
        }]
    }
```

### Done
Then the webpack will fetch the remote contents and build the codes for you!


## Usage with queryString

### Use directly in the js file. 
```js
require("node-async-require-loader!remote-content.ajs?queryString='en'");

```

### Set up the webpack.config.js
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?queryString='en'"
        }]
    }
```

## Example 

### Provide an .ajs file

Only write down the remote url that with contents(node moudle) you want to fetch.
The queryString will automatically append to the end of the url. 
(.ajs extenion is only for loader to recognize the file) 
 
remote-content.ajs
```js
https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/
``` 

With the queryString, the actual url we fetch is 

```js
//the queryString `en` is appended
https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/en/
```

So the contents will be the new url's contents
```js
module.export=function(){ console.log("Hello USA From Web"); };
```

### Set up the webpack.config.js
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?queryString='en'"
        }]
    }
```

### Done
Then the webpack will fetch the remote contents and build the codes for you!



## Useage with Pre Parser


## Example



## Useage with Pre Parser (React templates)


## Example


## Test

Use the command to run the mocha test. 
 
```
npm test
```
 
The test tagets are in the `examples/` folder. 

