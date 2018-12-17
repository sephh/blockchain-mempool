# Project #3. RESTful Web API with Node.js Framework

This is Project 3, RESTful Web API with Node.js Framework, in this project I created the classes to manage my RESTful Web API with Node.js Framework, to be able to access my API endpoints I used Express.

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node app.js__ in the root directory.

## Project Endpoints

* GET /block/:height:

Returns a JSON object with the block info

Response Example:

```
{
    "hash": "169fdca47690a209e95e583588c07b248d19f29499fbb8d50c362d457d2c4176",
    "height": 66,
    "body": "Test Block - 66",
    "time": "1544434070",
    "previousBlockHash": "8c84e5212554e24f3c976ff60057efef1618aa318a8e463027f674bee022a01d"
}
```

* POST /block

Add a new block to the chain.

Body Example:

```
{
    "body": "Your block value",
}
```

Response Example:

```
{
    "hash": "169fdca47690a209e95e583588c07b248d19f29499fbb8d50c362d457d2c4176",
    "height": 66,
    "body": "Your block value",
    "time": "1544434070",
    "previousBlockHash": "8c84e5212554e24f3c976ff60057efef1618aa318a8e463027f674bee022a01d"
}
```