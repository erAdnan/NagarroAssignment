# Nagarro Assingment- NY Times APIs Integration

- This app is on react native to show NY Times APIs integration, search call, etc.
- It has login, register screen also which uses `https://github.com/techiediaries/fake-api-jwt-json-server` for login and create account
- It has backend folder which consist of the auth code
- ## To Run Backend
- go to backend folder (follow the doc on github)
`npm install`
`npm run start-auth`

## Available Scripts - Running the application

After setting up your environment run the following commands:

`npm install`

### iOS

Change to the iOS directory:


`pod install`

Change back to the project directory

`npm run ios`


### Android

`npm run android`

## Screenshots

- ![Screenshot](/screenshots/screen_1.png)
- ![Screenshot](/screenshots/screen_2.png)
- ![Screenshot](/screenshots/screen_3.png)
- ![Screenshot](/screenshots/screen_4.png)
- ![Screenshot](/screenshots/screen_5.png)

## Tests
- `npm run test` for running the test cases
- `npm run test --coverage` for running the test coverage

## NY Times Setup
- need to create account for ny times developer to use API key for the APIs
- https://developer.nytimes.com/docs go here register/login and get the APIkey,
- replace it in constnats.