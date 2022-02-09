THIS IS THE SET UP GUIDE FOR ADES CA2 "ASK ME ANYTHING" ASSIGNMENT


# Table of Contents

1. [STEP 1 : Dependencies and links to their Installation page](#STEP-1----Dependencies-and-links-to-their-Installation-page)
2. [STEP 2 : Setup Instructions](#STEP-2----Setup-Instructions)
    1. [setup](#/setup)
       1. [Clone repository](#Clone-repository)
       2. [Run SQL Scripts](#Run-SQL-Scripts)
       3. [Installing dependencies](#Installing-dependencies)
       4. [Running application](#Running-application)
       5. [How to know if you have set up correctly](#How-to-know-if-you-have-set-up-correctly)

 3. [STEP 3 : Basic Code Organization](#STEP-3----Basic-Code-Organization)
     1. [code organization](#/co)
        1. [Where are the APIs](#Where-are-the-APIs)
        2. [Where-are-the-backend-application-logic](#Where-are-the-backend-application-logic)
        3. [Where does the Website send HTTP requests](#Where-does-the-Website-send-HTTP-requests)
        4. [Where are the Websites application logic](#Where-are-the-Websites-application-logic)



<h1>STEP 1 -- Dependencies and links to their Installation page</h1>

Nodejs : https://nodejs.org/en/download/ <br>

this will be the link to the dependencies that will be installed later during the setup : <br>
<ul>
<li>cors: https://www.npmjs.com/package/cors</li>
<li>dotenv: https://www.npmjs.com/package/dotenv</li>
<li>express: https://www.npmjs.com/package/express</li>
<li>ejs: https://www.npmjs.com/package/ejs</li>
<li>http-errors: https://www.npmjs.com/package/http-errors</li>
<li>morgan: https://www.npmjs.com/package/morgan</li>
<li>mysql: https://www.npmjs.com/package/mysql</li>
<li>nanoid: https://www.npmjs.com/package/nanoid</li>
<li>nodemon: https://www.npmjs.com/package/nodemon</li>
</ul>


<h1>STEP 2 -- Setup Instructions</h1>

<h3>Clone repository</h3>

To do this, go to visual studio code and press CTRL + Shift + P at the same time.
After that you will be prompted with a input box <br><br>

Type in " Git: Clone " If you dont already see it and click on it

<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873565572112191518/unknown.png"/><br><br>

After that you will be prompted with another input box :<br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873581898520199218/unknown.png"/><br><br>

input the link to our repository : https://github.com/ADES-FSP/ca2-zengfu_shoban_xinjing


It should appear like so :<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873565605100396604/unknown.png"/><br><br>

Press enter and you will have to set a file destination to save this repository.
once you have done that, press save and you will start downloading the repository

Open the file and ensure you have all these folders inside<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873566537661943808/unknown.png"/><br><br>

<h3>Run SQL Scripts</h3>
After cloning the repository, you will have to open mySQL workbench and run the askMeAnything.sql file found in the repository. <br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873917689993769010/unknown.png"/><br><br>

In your SQL workbench, create a new schema to store the SQL tables. 
To do so, right click on an empty in this space.<br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873918990815211570/unknown.png"/><br><br>

After right clicking, you should see this. <br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873918835319775243/unknown.png"/><br><br>

Click on create schema and you should see this. <br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873919324274950184/unknown.png"/> <br><br>

Name your schema <b>ask_me_anything</b> and finish creating it. Once your schema has been created, you should see this at the left hand side of your workbench. <br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873920123881271306/unknown.png"/> <br><br>

Ensure that the schema name is bolded to show that you are currently using this schema. If it is not bolded, you can double click the schema name and it will be bolded.

Now that you have your schema, you can execute the queries to creating the tables and insert the data. 
Create a new query tab and copy the contents in askMeAnything.sql file which is found in the repository.
Your query tab should have these codes: <br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873919619453317160/unknown.png"/><br><br>

Run this code by clicking on the third icon in this image: <br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873921060091854848/unknown.png"/><br><br>

After executing the codes, you should be able to find 3 tables (comments, questions and session_info) under ask_me_anything schema. <br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873921355328933948/unknown.png"/><br><br>

Going back to visual studio code, in the .env file, it should look like this: <br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873921328984502272/unknown.png" /> <br><br>
<b>Change the DB_USER and DB_PASSWORD according to your SQL database root and password.

<h3>Installing dependencies</h2>

To be able to run the assingment, you must install all dependencies required.
These are the dependencies required : <br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873566998808895498/unknown.png"/><br><br>

Change directory to the backend folder.
To do this , do  :
> cd backend
<br>
You should see something similar to this<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873567644308099122/unknown.png"/><br><br>

Run this code in your VSCode terminal  :
> npm i cors dotenv ejs express http-errors morgan mysql nanoid nodemon
<br>


After you have install the dependencies. double check in the package.json has all the dependencies stated above.

 <h3>Running application</h3>

To run server, change directory to backend if you havent already and then do : nodemon ./bin/www
You should see something similar to this<br><br>
<img src="https://media.discordapp.net/attachments/603596151358357524/873568098987421748/unknown.png"/><br><br>

Once the server is running, go to the website folder and under index.html, right click it.
You should see : <br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873568466362318868/unknown.png"/><br><br>

Click open with live server and it should open up you browser at our index.html page<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873568989563994142/unknown.png"/><br><br>

<h3>How to know if you have set up correctly</h3>
after going to this page click on the "Click here if you are an owner button"<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873570208969818162/unknown.png"/><br><br>

After that you will be prompted with this page <br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873570691327356978/unknown.png"/><br><br>

Press the "New" Button and it should generate a new session and owner ID <br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873570074290704434/unknown.png"/><br><br>

If you are able to generate those 2 things like seen in the image, then congratulations , you have successfully set up the application.
ENJOY!!!

<h1>STEP 3 -- Basic Code Organization</h1>

<h3>Where are the APIs</h3>
our api's are found under the routes folder in our backend folder<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873571181075267594/unknown.png"/><br><br>

<h3>Where are the backend application logic</h3>

our backend logic can be found under our models folder<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873572030509903982/unknown.png"/><br><br>

<h3>Where does the Website send HTTP requests</h3>

The website sends a http request in a js file for every html page<br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873572297091452988/unknown.png"/><br><br>

An example of our http request will look something like this : <br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873572485008875541/unknown.png"/><br><br>


<h3>Where are the Websites application logic</h3>

Our application logic can also be found under the js file for every html page

Here is an example of the logic : <br><br>
<img src="https://cdn.discordapp.com/attachments/603596151358357524/873574220339216454/unknown.png"/><br><br>





