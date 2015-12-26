# node-async-require-loader

> Transparently `require()` remote contents (node moudles) in webpack !

### Basic Usage

Fetch the remote contnets (node module) by http GET and build codes in webpack.
.ajs extenion is only for loader to recognize the file.

```
npm install --save node-async-require-loader
```

* Use directly in the js file. (Not recommed)
```js
require("node-async-require-loader!remote-content.ajs");

```

* Or Set up the webpack.config.js
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader"
        }]
    }
```

### Example for basic usage

##### Step 1. Provide an .ajs file

`.ajs` extenion is only for loader to recognize the file. 
Write down the remote url that with contents(node moudle) you want to fetch. 
The following is the exmaple of .ajs file.
 
`remote-content.ajs`
```js
https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/
``` 

the contnets from the remote url are: 

```js
module.export=function(){ console.log("Hello World From Web"); };
```
It's a node moudle.

##### Step 2. Set up the webpack.config.js
We set up the config so that the loader will load the .ajs file and to fetch the remote node moudle.

```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader"
        }]
    }
```

##### Step 3. Done
Then the webpack will fetch the remote contents and build the codes for you!
You can see `examples/example01` in codes for more detials.

### Usage with queryString

In some cases, the fixed remote url is not good. you may need to add queryString to fetch diffrent remote contents (node moudle).

* Use queryString directly in the js file. (Not recommed)
```js
require("node-async-require-loader!remote-content.ajs?queryString='en'");

```

* Or Set up the webpack.config.js
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?queryString='en'"
        }]
    }
```

## Example for using queryString

###### Step 1. Provide an .ajs file

`.ajs` extenion is only for loader to recognize the file. 
Write down the remote url that with contents(node moudle) you want to fetch.
The queryString you set will automatically append to the end of the url. 

 
`remote-content.ajs`
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
It's a node moudle.

###### Step 2. Set up the webpack.config.js
Use the sigle quote for the querString that you added.
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?queryString='en'"
        }]
    }
```

###### Step 3. Done
Then the webpack will fetch the remote contents and build the codes for you!
You can see `examples/example03` in codes for more detials.

### Useage with Pre Parser

In some cases, the remote contents you fetched may not be a pure node moudle. You need a parser to do some stuff before webpack compile it. So you can set up the preParser for the remote contents. 

`webpack.config.js`
```js
module.exports = {
...
    NodeAsycRequirePreParser: {
        anyNameYouWant: function(remoteRawContent) {
            // replace by your own contents
            remoteRawContent = "module.exports=function(){ console.log('Replaceed by custom preParser!');}";
            return remoteRawContent;
        }
    }
}
```


### Example

###### Step 1. Provide an .ajs file

`.ajs` extenion is only for loader to recognize the file. 
Write down the remote url that with contents(node moudle) you want to fetch.
The queryString you set will automatically append to the end of the url. 

 
`remote-content.ajs`
```js
https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/
``` 

###### Step 2. Write down your own the preParser in webpack.config.js

The fetched contents will be passed to the preParser you write (in this example, it will be `anyNameYouWant`) before webpack compile it.

`webpack.config.js`
```js
module.exports = {
...
    NodeAsycRequirePreParser: {
        anyNameYouWant: function(remoteRawContent) {
            // replace by your own contents
            remoteRawContent = "module.exports=function(){ console.log('Replaceed by custom preParser!');}";
            return remoteRawContent;
        }
    }
}
```

After the fetched contents are parsed by PreParser. The new contents will be

```js
module.exports=function(){ console.log('Replaceed by custom preParser!');}
```
It's a new node moudle.

###### Step 3. Set up the preParser in webpack.config.js
Use the sigle quote for the querString that you added.
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?preParser=anyNameYouWant"
        }]
    }
```

###### Step 3. Done
Then the webpack will fetch the remote contents and build the codes for you!
You can see `examples/example05` in codes for more detials.



### Useage with Pre Parser (React templates)


### Example


### Test

Use the command to run the mocha test. 
 
```
npm test
```
 
The test tagets are in the `examples/` folder. 

