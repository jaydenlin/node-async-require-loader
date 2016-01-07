# node-async-require-loader
[![Build Status](https://travis-ci.org/jaydenlin/node-async-require-loader.svg?branch=master)](https://travis-ci.org/jaydenlin/node-async-require-loader)  

> Transparently `require()` remote contents (node moudles) in webpack !


```
npm install --save node-async-require-loader
```
### Concept
Fetch the remote contnets (node module) by http GET and build codes in webpack.   
I made up the file with `.ajs` extention.
* Only for the loader to recognize the file.
* The file contents is a node moudle that provides a remote url.
```js
module.exports = {
   remoteUrl : "http://xxx.xxx.xxx/api/"
}
```
* webpack will fetch the contents by the remote url to build codes.

### Highlight
* Provid the `PreParser` config for parsing remote contents before webpack compiles.
* Privde the `queryString` config for fetching diffrent remote contents.
* Provide the `PreParser` for [react-templates](http://wix.github.io/react-templates)!
* How about isomorphic `require()` on server-side ? We got [node-async-require](https://github.com/jaydenlin/node-async-require) for it !  

### Basic Usage

Fetch the remote contnets (node module) by http GET and build codes in webpack.   

* Intsall this module
```
npm install --save node-async-require-loader
```
   
   
* Use directly in the js file. (Not recommed)
```js
require("node-async-require-loader!remote-content.ajs");

```

* Or Set up in the webpack.config.js
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader"
        }]
    }
```
   

> You may wondering what '.ajs' file is. The file contents of the `.ajs` file is a node moudle providing a remote url. The remote url that provides contents(node moudle). The `.ajs` extention is only for the loader to recognize the file.


### Example for Basic Usage

##### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node moudle providing a remote url.      
Write down the remote url that provides contents(node moudle).  
The following is the exmaple of .ajs file.  
 
`remote-content.ajs`

```js
module.exports = {
	remoteUrl: "https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/"
}
``` 

the contnets from the remote url are: 

```js
module.exports=function(){ console.log("Hello World From Web"); };
```
It's a node moudle.

##### Step 2. Set up the webpack.config.js
We set up the config so that the loader will load the .ajs file and fetch the remote node moudle.

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

In some cases, the fixed remote url is not good. You may need to add queryString to fetch diffrent remote contents (node moudle).

* Use queryString directly in the js file. (Not recommed)   
Use the `sigle quote` for the querString that you added.

```js
require("node-async-require-loader!remote-content.ajs?queryString='en'");
```

* Or Set up in the webpack.config.js   
Use the `sigle quote` for the querString that you added.
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

The file contents of the `.ajs` file is a node moudle providing a remote url.      
Write down the remote url that provides contents(node moudle).  
The following is the exmaple of .ajs file.  
 
`remote-content.ajs`
```js
module.exports = {
    remoteUrl: "https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/"
}
``` 

When webpack start to run, the queryString you set will automatically append to the end of the url. 
With the queryString, the actual url we fetch is 

```js
//the queryString `en` is appended
https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/en/
```

So the contents will be the new url's contents
```js
module.exports=function(){ console.log("Hello USA From Web"); };
```
It's a node moudle.

###### Step 2. Set up the webpack.config.js
Use the `sigle quote` for the querString that you added.
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

### Usage with preParser

In some cases, the remote contents you fetch may `not be a pure node moudle`. You need a parser to do some stuffs before webpack compiles it. So you can set up a preParser for the remote contents.

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


### Example with preParser

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node moudle providing a remote url.      
Write down the remote url that provides contents(node moudle).  
The following is the exmaple of .ajs file.  
 
`remote-content.ajs`
```js
module.exports = {
    remoteUrl: "https://jaydenlin.github.io/fake-remote-contents-for-test/contents/pure-js/"
}
``` 

###### Step 2. Write down your own the preParser in webpack.config.js

The fetched contents will be passed to the preParser you write (in this example, it will be `anyNameYouWant`) before webpack compiles it.

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
To use the preParser that you added, set the `preParser=anyNameYouWant`
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



### Usage with preParser (React templates)
We provide a preparser for pasing react-templates contents.
You can use it by setting the `preParser=rt`.

```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?preParser=rt"
        }]
    }
```

### Example with preParser (React templates)

###### Step 1. Provide an .ajs file

The file contents of the `.ajs` file is a node moudle providing a remote url.      
Write down the remote url that provides contents(node moudle).  
The following is the exmaple of .ajs file.  
 
`remote-content-using-react-templates.ajs`
```js
module.exports = {
    remoteUrl: "http://jaydenlin.github.io/fake-remote-contents-for-test/contents/react-template/"
}
``` 
the contnets from the remote url are: 

```html
<div>
  <h3>Hello World Form Web</h3>
</div>
```
It is a react-template.

###### Step 2. Set up the preParser in webpack.config.js
   
To use React Teamplates parser, set the `preParser=rt`.   
```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?preParser=rt"
        }]
    }
```
The react-template preParser will parse the contents to pure node moudle before webpack compiles.

###### Step 3. Done
Then the webpack will fetch the remote contents and build the codes for you!
You can see `examples/example02` in codes for more detials.

### Example for using local file

##### Step 1. Provide an new .ajs file

Add local path to ajs file
 
`local-content.ajs`

```js
module.exports = {
	remoteUrl: "http://jaydenlin.github.io/fake-remote-contents-for-test/contents/react-template/",
	localPath: './examples/example06--usage-with-local/test.txt'
}
```

the contnets in the test.txt are: 

```js
module.exports=function(){ console.log("Hello World From Local"); }
```
It's a node moudle.

##### Step 2. Set up the webpack.config.js
We set up the config `?async=false` so that the loader will load the .ajs file and fetch the local node moudle via `localPath`.

```js
    module: {
        loaders: [{
            test: /\.ajs$/,
            loader: "node-async-require-loader?async=false"
        }]
    }
```

##### Step 3. Live reload Settiing
Because this module hijacks the webpack's build proccess, so the local file you used will not be watched by webpack. If you want to let your local file be watched and do live reload by webpack.
You need to do the following settings.

```
npm install watchfile-webpack-plugin --save
```

```
var watchFilePlugin = require("watchfile-webpack-plugin");
...
plugins: [
        new watchFilePlugin({watchFolder: "./", watchExtension: "rt"})
    ],
...
```

##### Step 4. Done
Then the webpack will get local file content and build the codes for you!
You can see `examples/example06` and `examples/example07` in codes for more detials, it also work fine with react templates.

### Test

Use the command to run the mocha test. 

```
npm test
```
 
The test tagets are in the `examples/` folder. 

