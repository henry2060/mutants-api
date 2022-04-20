## Description

[Mutants](https://github.com/henry2060/mutants-api) API Rest to validate if dna is mutant.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# test coverage
$ npm run test:cov
```

## Required

To install in local is required to have a mongoDB and create a db with 2 collections
use mutants
db.createColettion('mutants')
db.createColettion('statsmutants')
db.statsmutants.insertOne({"dna": "ATGCGACAGTGCTTATGTAGAAGGCCCCTACCACTG"})
db.statsmutants.insertOne({"dna": "FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF"})
db.statsmutants.insertOne({"_id": "625ddab5a8e642ef3b8d785b", "count_mutant_dna": 1, "count_human_dna": 1, "ratio": 1})

## Path

```bash
# Local
$ http://localhost:3000/stats
$ http://localhost:3000/mutants

# Cloud
$ http://ec2-18-223-247-79.us-east-2.compute.amazonaws.com/mutants
$ http://ec2-18-223-247-79.us-east-2.compute.amazonaws.com/stats
```

