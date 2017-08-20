A project to learn React.js by creating a searchable and editable provider directory.

I'll be following along with a project I found on the web at http://coenraets.org/blog/2014/12/sample-mobile-application-with-react-and-cordova.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Getting started with React

Linux
* Tried the naive approach of using sudo apt-get install to install Node.js. But the Ubuntu version is nodejs, and creates an executable of nodejs, which messes up npm and other tools. Apparently there's a holy war going on about who gets to call their application Node. Didn't want to get into that, so went to the Node.js website (nodejs.org) and followed their directions for installing Node v. 6.x. Apparently the current version is 8.4.0, but for some reason they're still advising most people to use 6.x. Okay, again, not getting into a controversy here, so went with that.
  * curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  * sudo apt-get install -y nodejs
  That downloads, compiles, and installs Node.js. It creates the executable as both node and nodejs (the latter being a symlink to the former). It also installs npm.

Mac
* Pretty straightforward, but I need to check the versions:
  * sudo brew install node
  * sudo brew install npm
  * brew update
  * brew upgrade node
  
Test the installation:
* node -v
* npm -v

Using
* Install the React project create tool:
  * sudo npm install -g create-react-app
* Create a React application:
  * create-react-app <app name>

Example: react-employee-directory (http://coenraets.org/blog/2014/12/sample-mobile-application-with-react-and-cordova/)
* Don't delete all the fluff that create-react-app makes for you; apparently some of it is needed by npm.
* npm is calling index.js, which imports an App object from App.js, not app.js as on the example project. Had to change the code a little bit, including importing React at the top, wrapping HomePage in an App class, and exporting App at the bottom rather than having React render HomePage directly. This is a minimally functioning app; it's yet to be determined if it's optimal or meets style expectations.
* Getting the promises in iteration 4 working has been challenging. One thing I've had to do is install jQuery in the project, which I'm writing here because it's not in the source code:
  * npm i jquery --save
  This added a line to the dependencies section of package.json. Maybe I can do that myself next time. That at least gets the $.Deferred() to compile.
