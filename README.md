<h1>Assigment 1</h1>

<h2>Part 1</h2>
```For this project, our group decided to go with the standard social media website. It seemed like a fun idea and did not sound like an overly complicated challenge.

  To begin our project we first tackled the design aspexts of this project and that first involved choosing the name of our social media platform, which we decided on "yoVerse", because it combined two words: your and universe, which is a great title for an up and coming social media platform where users can share their thoughts and experinces with the world. The next step in creating our social media platform was to figure out the graphic design aspect which included choosing the color scheme and creating a logo. To select the colors we utilized Coolors.co, to randomize different color patterns and find interesting color schemes that would fit our websites mood and feel. Once we settled on our desired color grid, we then chose one of the mpst eye catching colors and created a Logo with it to ensure it would match our website aesthetic. Our team used freelogodesign.org to create our logo with matching colors and moved on to designing our website.

  To create our first draft we drew up a few pages in HTML5, CSS, and Bootstrap. We utilized GitHub for our version control and to keep everything generally organized while working remotely and as a team. Dax was in charge of the general styling of the webstie which included most of the graphic aspects of our socail media platform. Dax also designed various classes and IDs to make the page more aesthetically pleasing as well as creating the [sign-up page](https://github.com/Temch4k/Assigment-1/blob/main/signup.html). Micah constructed the [home page](https://github.com/Temch4k/Assigment-1/blob/main/homePage.html), [profile](https://github.com/Temch4k/Assigment-1/blob/main/profilePage.html) [pages](https://github.com/Temch4k/Assigment-1/blob/main/profileSettings.html) and the [forgotten password page](https://github.com/Temch4k/Assigment-1/blob/main/forgotPassword.html), while Artsiom created the [sign-in page](https://github.com/Temch4k/Assigment-1/blob/main/signin.html) and worked on the scaling of pages for different windows sizes to suit all users and ensure that whatever platform is being used to view our social media website that it would look appropriate. Artsiom also did some maintenance on the pages, making sure that the footers and headers were correctly sized and were anchored in the appropriate places.

  Our design is trying to section the page into relative sections. It seemed most appropriate to set each section in rectangular sections with curved edges in some sections. We choose this styling in order to look similar to other professional sites such at Twitter and Facebook while looking different enough with the defined staggered box layout to stand out from the crowd while still maintaining a familiar feel for our users.

  To view out site please [click here](https://temch4k.github.io/Assigment-1/)
  -- Click log in to view homepage --
  -- Click Sign Up to View Sign Up page --
  -- Click The Profile button in right hand corner of homepage to view profile --


<h2>Part 2</h2>

  Let's continue working on our final social media project for the Web Application Development class. On this assignment, our team had to make the project more dynamic and add some security to our account creation, such as password validation and the addition of security questions during our user's account creation process to make the process more secure and interactive.

  Dax and Micah worked on the assignment's password part, while Artsiom went with the website's security questions. The password validation form took a little bit of troubleshooting to get running, however once the correct place to call the validateFormm() action was found things worked smoothly. Dax implemented the check if both password fields were the same and that no bizzare characters were present within any input fields. Micah implemented the check for if the password contained an uppercase, lowercase and number.

  For the secuirty question part of this assignemnt Artsiom began by looking up frequently used security questions and used the suggested questions from https://docs.whmcs.com/Security_Questions . He also went back into one of our first classworks and utilized the Covid Survey website which was a good template to base the form off of. The biggest challenge of this task was to take the functions that already existed and make them reusable by different parameters. To solve this problem, all he had to do was pass the id of the <select> element as the function's parameter. Since all three of the security questions had IDs of q1, q2, and a3, we needed to get DivQ1, DivQ2, and DivQ3 to appear when the corresponding ID's <select> element was called. By passing the IDs of the elements into the function, he took their last character, which was their numbers, and simply attached them to the back of the DivQ string, which, when we added a number to the end, would correspond to the ID of the <select>. After finishing the security questions, Artsiom went ahead and added a Favicon to our social media (it's the small icon that shows up on the tab of the browser, next to the tab's name), so our users would quickly identify which tab our website is open in.

  Overall things went smoothly while completeing this assignment, most the issues our group faced were over version control or pulling versions from our peers which did not match the versions we had on our local machines. But these are easily manageable problems and did not provide any serious roadblocks in the completion of othis assignment.


<h2>Part 3</h2>

  Implementing MongoDB on our webapp.

  For part three of this project we needed to implement a log in and sign up feature for our social media webapp. We implemented a MVC (Model View Controller) architecutre that allows us to run a mongo database allowing our users the functionality to log in and sign up for our websites services.

  Artsiom worked on the directory system, created the homeController that was the one to process all of the page directories and functions. He connected all of the pages together that using the ejs files instead of the html, like we had in the last part of the assignment. He fixed a few page sizing errors that we had on the securityQuestions page, and created the layout.ejs that will be the main page through which everything is going to be loaded.  Dax implemented the views and converted our HTML pages into EJS allowing pages as well as creating our user model. UserContoller was done by Micah which allows our webapp to retrieve and post data to our database as well as the seed which creates the database.

Dax got the mongo database running. He created the models and did a good amount of bug fixes. He also was in charge of the signup and signin data as well as the logic for the checks. He made sure that when a user logs in that the database searches for the specified email address then matches it to the associated password. He also, made sure that all the tables in the signup were populated and the passwords matched. If any of these conditions were not met, an error message was created and placed within the views for signup and login.

Some problems we ran into: we couldn't figure out how to connect regular js files that contained functions for some of the interactive parts of our website, such as security question fields where you can insert the input popping up after selecting a question you would like to enter. The fix to that was putting all of the js functions for the interactive website into the public folder, and through there it actually started to do what it was supposed to do.


<h2>Part 4</h2>

  Intruducing Crud and User Authorization

  For part 4, we had to create a CRUD class system for changing the different parts of our mongodb system. In addition, we had to authorize user using passport and use passport sessions in order to allow users to use specific sections of our sites.

  Artsiom made sure that the linking between web pages was fully functional. In addition, he made it so that a user had to be validated before they were able to access certain views. Also, Artsiom had created the follow page which shows a list of users to follow on the web site. He implimented the view for a user to view their own user profile which shows all information the user has on the database minus the password, as well as by adding a different username to the page call to see differen user profiles such as: here is out user profile - http://localhost:3000/user/dreams/Profile - if we replace username dreams with anothr username it will show us another profile. The greatest task Artsiome had was in error correction, he corrected a large portion of the bugs we were having an ultimately got the application running when the rest of the team and their resources were unable to do so. He also got sign out work properly too. Artsiome got post functionality working properly. He got the profile navigation working properly and the functionality behind updating all but the password fields. Artsiom also implimented viewing each individuals profile from their tag on their posts.

  Dax was in charge of making the security question functional, implimenting CRUD classes and verification. He laid the ground work for said CRUD but was ultimately unsuccesful at getting the functionality of his work complete. In addition, Dax was in charge of completing the functionality of change password for each user. Dax had done the validation of each of the forum entries using express-validator.

  Micah reworked the home page to make it more visually appeasing and more dynamic for different sized windows.

We struggled quite a bit with the routing at the start and understanding when to differentiate between a model and a user which lead to days of debugging before we figured out the issue.

For the future we are planning on adding profile pictures and picture posting as well as an algorithm that will find trending posts and what could be interesting for the user.

In order to get the application working, the user must navigate to the directory call "node seed" to populate the default profiles, then call "npm start". The website will start on localHost:3000.

We plan, to impliment actually adding friend(s) to each profile and pictures. Finally, we would like to impliment direct messaging between users privately so no other user can see said messages.


<h1>Final Project - Final Version</h1>

In the last installment in the creation of our webapp "yoVerse" we implemented hahstags and notifications for our users as well as deploying it for use!
You can click [HERE](https://rocky-savannah-72606.herokuapp.com/) to view and experince our webapp!

The final touches to the webapp were done by all memebrs of our group, each of us had a hand in completeing the requirements necessary for this assignment. To deploy our webapp we chose to host our app through heroku and run our database through MonogoDB. All of the webapp documents that create "yoVerse" are contained within this repository.
