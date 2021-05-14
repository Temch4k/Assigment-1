# Final Project

In the last installment in the creation of our webapp "yoVerse" we implemented hahstags and notifications for our users as well as deploying it for use!

To watch our overview video go [HERE](https://www.youtube.com/watch?v=VD76Uc1K_fo&ab_channel=ArtsiomSkarakhod)!

The final touches to the webapp were done by all memebrs of our group in a collaborative effort, each of us had a hand in completeing the requirements necessary for this assignment. To deploy our webapp we chose to host our app through heroku and run our database through MonogoDB. All of the webapp documents that create "yoVerse" are contained within this repository.


## Install

To install and run this webapp on your local machine ensure that you have MonogDB and Git installed on your machine, to install MongoDB follow [this link.](https://docs.mongodb.com/manual/installation/) and to install git [go here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git). If you run into any errors installing packages or running the webapp see this [site](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) for help.
From here you need to download all of the webapp files, to do so clone this repo or run this command: 
```
git clone https://github.com/Temch4k/Assigment-1/
```
Once you have all of the file on your machine start up the Mongo database by running this command:
```
mongo
```
From here open a seperate terminal window and navigate to the location of where the webapp files are and install of the packages by running this command:
```
npm install -s
```
You are now setup to run the webapp on your local machine. To use the app run one final command to start the application:
```
npm start
```
This will allow you to view the applciation on your browser at the address "localhost:3000/"


## Design Choices

For this project we chose to use a MVC architecture since we needed to use CRUD(create, read, update, delete) processes. We chose to use the Bootsrap libraries for the majority of the styling on our website. The GUI was designed to be intuitve and appealing to our users and work for all screen sizes. We based the format of our website off of other similar social medias so that our users may be familar with how to interact with our webapp. Errors for the users will show up as a flash message and for the server errors will be logged in the terminal. We chose to use bcrpyt for encrypting our passwords, and users are allowed to change their password when they want. We are using passport so only authenticated users are able to access the majority of the site and unauthorized users are only able to access the login and sign up pages. 
