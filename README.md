# Triangle challenge

Application that classifies a triangle as equilateral, isosceles or scalene based on its given side lengths.

## Solution
The solution is published on the following website:
 
 https://diana-tofan.github.io/triangleChallenge/
 
 
## Getting started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

This project is using [NPM](https://www.npmjs.com), hence you will need [Node.js](https://nodejs.org/en/) installed on your environment.

After the installation you should be able to run:

```
$ node --version
v11.12.0
$ npm --version
6.7.0
```

### Installing

1. Clone the repository
    ```
    $ git clone https://github.com/diana-tofan/triangleChallenge.git
    ```
2. Go to project folder
    ```
    $ cd PROJECT
    ```
3. Install dependencies
    ```
    $ npm install
    ```

### Start and watch
```
$ npm start
```

### Simple build for production
```
$ npm run build
```

#### Deployment
```
$ npm run deploy
```

## Running the tests
The project uses [Mocha.js](https://mochajs.org/) framework to run tests.

### Break down into unit tests

The tests ensure that:
* input fields are not empty
* side lengths are positive floating point numbers
* side lengths can actually form a triangle
* triangles are classified correctly

### Built With
* [React.js](https://reactjs.org/) - The web framework used
* [Mocha.js](https://mochajs.org/) - Unit testing
* [Tradeshift UI](http://ui.tradeshift.com/v12/#intro/) - UI components

## Authors
* **Diana Tofan** - https://github.com/diana-tofan/triangleChallenge

## Implementation Choices
React.js was mainly used for simplicity, performance, testability and a smooth state management.

For testing purposes, Mocha.js was chosen due to its flexibility and compatibility with several JavaScript assertion libraries.

Ultimately, Tradeshift UI was used to speed up the development time by integrating reusable Tradeshift UI elements into the app.
