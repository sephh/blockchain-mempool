# Project #4. Private Blockchain Notary Service

This is Project 4,Private Blockchain Notary Service, in this project I created the classes to manage validation requests and after validation, Post and Get stars info.

## Setup project for Review.

To setup the project for review do the following:
1. Download the project.
2. Run command __npm install__ to install the project dependencies.
3. Run command __node app.js__ in the root directory.

## Project Endpoints

* POST /requestValidation

Store a address to future validation.

Body Example:

```
{
    "address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
}
```

* POST /message-signature/validate

Validate the address

Body Example:

```
{
    "address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
    "signature":"H8K4+1MvyJo9tcr2YN2KejwvX1oqneyCH+fsUL1z1WBdWmswB9bijeFfOfMqK68kQ5RO6ZxhomoXQG3fkLaBl+Q="
}
```

* POST /block

Add a new block to the chain.

Body Example:

```
{
    "address": "19xaiMqayaNrn3x7AjV5cU4Mk5f5prRVpL",
    "star": {
            "dec": "68° 52' 56.9",
            "ra": "16h 29m 1.0s",
            "story": "Found star using https://www.google.com/sky/"
        }
}
```

* GET /stars/hash:[HASH]

Returns a JSON object with the star info

* GET /stars/address:[ADDRESS]

Returns a ARRAY with all stars related to the address

* GET /block/:height

Returns a JSON object with the star info
