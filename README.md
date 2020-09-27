### Tweet Catcher
This is a monorepo for my M.S. Software Engineering Capstone Project.
We are investigating if it is possible to use the content of Elon Musk's tweets to create a Machine Learning model that can recommend buying, or selling Tesla stock (NASDAQ:TSLA).

The project consists of three parts:
* Tweet catcher: This calls twitters api to collect Elon's tweets, and puts them in a Microsoft Azure CosmosDB.
* Azure Functions: These are created in order to lock down access to the database to only one access point. There are currently 4 functions that,
    * Insert documents into the gold copy tweets
    * Read from a collection of projected tweets
    * Updated records in the projected tweets collection
    * Send tweets to Azure Text Analytics to perform Sentiment Analysis and Entity Extraction
* Machine Learning: Code to train the model we plan to use