<h3 align="center">Ask Me Anything</h3>
  <p align="center">
    Documentation of AMA Backend
    <br />
    <a href="https://github.com/ADES-FSP/ca2-zengfu_shoban_xinjing"><strong>Explore AMA Project</strong></a>
    <br />
    <br />
    <a href="https://github.com/ADES-FSP/ca2-zengfu_shoban_xinjing/tree/master/website">View Frontend</a>
    ·
    <a href="https://github.com/ADES-FSP/ca2-zengfu_shoban_xinjing/tree/master/backend">View Backend</a>
    ·
    <a href="https://github.com/ADES-FSP/ca2-zengfu_shoban_xinjing/issues">Report Bug</a>
  </p>

# Table of Contents

1. [About The Project](#about-the-project)
    1. [Why Do I Build This Project](#why-do-i-build-this-project)
2. [API Documentation](#api-documentation)
    1. [session](#/session)
        1. [create session](#create-a-new-session)
        2. [check session](#check-if-session-is-started)
        3. [start session](#start-a-session)
        4. [stop session](#stop-a-session)
    2. [question](#/question)
        1. [get all questions](#get-all-questions)
        2. [get question by id](#get-question-by-id)
        3. [post question](#post-question)
        4. [answer question](#answer-question)
    3. [comment](#/comment)
        1. [post comment](#post-a-comment)

## About The Project

The Ask Me Anything(AMA) systems are a very useful tool in engaging with audiences such as teacher trying to engage with
students.

### Why Do I Build This Project

There are many great solutions available out there, however, I didn't find one that really suit my needs, so I created
this enhanced one. I want to create the one that is so amazing that it'll be the last one you ever need -- I think this
is it.

Here's why:

* Your precious time should be saved.
* You shouldn't be doing the same tasks over and over like looking for the AMA that suits your need.
* You should element DRY principles to the rest of your life :smile:

Of course, no one project will serve all users since your needs may be different. So I'll be adding more in the near
future. You may also suggest changes by forking this repo and creating a pull request or opening an issue. Thanks to all
the people who have contributed to expanding this project!

## API Documentation

### /session

Session Route used to handle user or owner sessions.<br>

1. #### Create a new session
    * Path: `http://localhost:3000/session/`
    * Method: `GET`
    * **Successful Response**:

   > Status: 200 OK
   ```json5
   {
   "user_session": "u-8Up-Ld9N",
   "owner_session": "Yhapm6uS1_"
   }
   ```
   <br>

2. #### Check if session is started

    * Path: `http://localhost:3000/session/status`
    * Method: `GET`
    * Parameter: `Query: {
      "user_session": "u-8Up-Ld9N"}`
    * **Successful Response**:
      > Status: 200 OK
      ```js
      true
      ```
      ```js
      false
      ```
    * **Error Response**:
      * The session does not exist
      > Status: 400 Bad Request
         ```text
         The user session does not exist!
         ```
      
      * The session is not the length of 10
          > Status: 400 Bad Request
          ```text
          Session (session) must be the length of 10!
          ```
   <br>

3. #### Start a session
    * Path: `http://localhost:3000/session/start`
    * Method: `POST`
    * Parameter: `Body: {
      "user_session": "u-8Up-Ld9N",
      "owner_session": "Yhapm6uS1_"
      }`
    * **Successful Response**:

      > Status: 200 OK
      ```text
      Session started
      ```
    * **Error Response**:
        * The owner and user sessions do not match
          > Status: 400 Bad Request
          ```text
          The user session does not match with owner session!
          ```
          
          * The session is not the length of 10
          > Status: 400 Bad Request
          ```text
          Session (session) must be the length of 10!
          ```
   <br>

4. #### Stop a session
    * Path: `http://localhost:3000/session/stop`
    * Method: `POST`
    * Parameter: `Body: {
      "user_session": "u-8Up-Ld9N",
      "owner_session": "Yhapm6uS1_"
      }`
    * **Successful Response**:
      > Status: 200 OK
        ```sh
      Session stopped
      ```
    * **Error Response**:
        * The owner and user sessions do not match
          > Status: 400 Bad Request
          ```text
          The user session does not match with owner session!
          ```
          ```text
          Session (session) must be the length of 10!
          ```

### /question

Question Route used to handle questions or answers posted.<br>

1. #### Get all questions

    * Path: `http://localhost:3000/question/getAll`
    * Method: `GET`
    * Parameter: `Query: {
      "user_session": "u-8Up-Ld9N"}`
    * **Successful Response**:
      > Status: 200 OK
      ```sh
      [
         {
          "question_id": 1,
          "question_description": "what is your favorite candy bar?",
          "is_answered": 1,
          "answer": "Oreo",
          "follow_up_to": null 
          },
         ...
         ...
         ...
      ]
      ```
    * **Error Response**:
      > Status: 400 Bad Request
      ```text
      The user session does not exist!
      ```
      <br>


2. #### Get Question By ID

    * Path: `http://localhost:3000/question/byId`
    * Method: `GET`
    * Parameter: `Query: {
      "user_session": "u-8Up-Ld9N" , "question_id": "1"}`
    * **Successful Response**:
      > Status: 200 OK
      ```json5
      [
         {
          "question_description": "what is your favorite candy bar?",
          "answer": "Oreo",
          "follow_up_to": null,
          "comment_description": [
            "I dont like it at all",
            "what is a candy bar?"
            ] 
          }
      ]
      ```
    * **Error Response**:
      > Status: 400 Bad Request
      ```text
      The user session does not exist!
      ```
   <br>

3. #### Post Question

    * Path: `http://localhost:3000/question/postQuestion`
    * Method: `POST`
    * Parameter: `Body: {
      "user_session": "u-8Up-Ld9N" , "question": "How do you think?", "follow_up_to" : null}`
    * **Successful Response**:
      > Status: 200 OK
      ```text
      Question Posted
      ```
    * **Error Response**:
        * The session does not exist
          > Status: 400 Bad Request
          ```text
          The user session does not exist!
           ```
        * Session is not started by owner
          ```text
          The session is not started by owner!
          ```  
   <br>

4. #### Answer Question

    * Path: `http://localhost:3000/question/postAnswer`
    * Method: `POST`
    * Parameter: `Body: {
      "user_session": "u-8Up-Ld9N",
      "owner_session": "Yhapm6uS1_",
      "question_id" : 1,
      "answer" : "I don't think so"
      }`
    * **Successful Response**:
      > Status: 200 OK
      ```text
      Question Answered
      ```
    * **Error Response**:
        * The session does not exist
          > Status: 400 Bad Request
          ```text
          Session does not exist
          ```
        * The owner and user sessions do not match
          > Status: 400 Bad Request
          ```text
          The user session does not match with owner session!
          ```
        * Session is not started by owner
          ```text
          The session is not started by owner!
          ```  
        * Invalid question ID or it's been answered
          > Status: 400 Bad Request
          ```text
          Cannot find this question or it has already been answered!
          ```
   <br>

### /comment

Comment Route allows users to post a comment.<br>

1. #### Post a comment
    * Path: `http://localhost:3000/comment`
    * Method: `POST`
    * Parameter: `Body: {
      "user_session": "u-8Up-Ld9N",
      "question_id" : 1,
      "comment" : "What is a candy bar?"
      }`
    * **Successful Response**:
      > Status: 200 OK
      ```text
      Comment Posted
      ```
    * **Error Response**:
        * The session does not exist
          > Status: 400 Bad Request
          ```text
          The user session does not exist!
          ```
        * The owner and user sessions do not match
          > Status: 400 Bad Request
          ```text
          The user session does not match with owner session!
          ```
        * Session is not started by owner
          ```text
          The session is not started by owner!
          ```
        * Invalid question ID
          > Status: 400 Bad Request
          ```text
          Cannot find this question!
          ```
