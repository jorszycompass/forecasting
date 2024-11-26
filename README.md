# Forecasting (luna) Service

The forecasting Service is a new composite service that will allow operators to predict more precisely how much of certain items they should stock based on historical data and a new AI model being developed by the data team.

## Getting started

You will need the following setup:

- Docker setup on your host machine
- DBeaver client to connect to the database
- An `.env` file with config values -- setup below.
- A running postgres db locally -- setup below.

#### Creating an env file

Create an `.env` file.

```
cp -v .env.template .env
```

Open the env file and ensure that the values are correct.

#### Create a docker-compose file

Ensure that you have created a `docker-compose.yml` file.

```
cp -v docker-compose.yml.template docker-compose.yml
```

Open the `docker-compose.yml` file and update any values that need to be set. Such as the npmrc token.

#### Running postgres locally

Ensure that you have a local instance of postgres running.

To start it use:

```
docker compose up db -d
```

To stop it use:

```
docker compose stop db
```

For first time setup, you will need to create the database schema.

1. Go to DBeaver, connect to your locally running database.
2. Create a new Schema called `main`.
3. Open the `create.sql` file from this repo.
4. Run the contents of the file in DBeaver to create the tables.

## Local development

```
npm ci
npm run start:dev
```

## Local docker

Ensure that you have a `docker-compose.yml` file. Note, you don't need the build flag every time, but can be useful to rebuild changes. For local development, you should run the application itself rather than the image.
To start all services including dependencies run:

```
docker compose up --build
```

To start only the catalogue service:

```
docker compose up catalogue --build
```

## FAQ

### Where can I get my npmrc token?

Open your `~/.npmrc` file to find the token value. It will be part of a larger string, you just need to copy the token itself.

```
//registry.npmjs.org/:_authToken=YOUR_TOKEN_IS_HERE
```

### Why would I need to run the imgae?

It can be a good test to validate that the application will build correctly on AWS. Since this is an image, you will be able to validate exactly what will be shipped to production outside of config values. It should be part of your standard checks before merging code into master.

### How do I install Docker on my machine?

Run the following commands:

```
brew install docker
```

Next, install [Rancher Desktop](https://github.com/rancher-sandbox/rancher-desktop/releases). Do not download Docker desktop due to licensing issues.
Start Rancher and finish the setup. When prompted use the dockerd container engine.

##### If you are getting an issue related to getting credentials

In case you run into the following error when running a compose file:

```
error getting credentials - err: exec: "docker-credential-desktop": executable file not found in $PATH, ...
```

Remove the `credsStore` line from `~/.docker/config.json`.