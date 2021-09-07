# Experiments with react-query library

## Table of Contents

- [About](#about)
- [Getting Started](#getting_started)
- [Usage](#usage)
- [Contributing](../CONTRIBUTING.md)

## About <a name = "about"></a>

I'm trying out a different and productive way to work with data fetch in React using the `react-query` library.

In this project I will test the `react-query` library implementing the following features:

**User List**
- User Listing
- Paging with navigation and limit
- Combined filters
- Ordering

**User detail**
- Retrieve cached data from a user id.

Please don't judge me by the poor interface, the focus of this project is on validating the library and not building a pretty application 😇

## Getting Started <a name = "getting_started"></a>

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

To run this project you will need [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/). Most likely, you won't have to install npm separately, as it is often bundled with Node.js.

For simplicity and flexibility with the Node.js versions you can also choose to install a version manager for Node.js, such as [nvm](https://github.com/nvm-sh/nvm).

If you want to use the same dataset I used from a JSON file, you will also have to install [json-server](https://github.com/typicode/json-server).

### Installing

After getting Node.js and npm, run the following command to install all project dependencies into the `node_modules` folder.

```bash
# npm install
```

## Usage <a name = "usage"></a>

If you choose to use `json-server` to emulate a real API you will need to run the script that initializes the API first.

```bash
# npm run mock
```

After that, just run the application to access the main screen and be able to browse the features.

```bash
# npm start
```

You should see a screen similar to the one below.


<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/react-query/blob/main/src/static/printscreen-02.png" alt="printscreen-02.png">
    </td>
  </tr>
</table>


**Some more screenshots**

<table>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/react-query/blob/main/src/static/printscreen-01.png" alt="printscreen-01.png">
    </td>
  </tr>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/react-query/blob/main/src/static/printscreen-03.png" alt="printscreen-03.png">
    </td>
  </tr>
  <tr>
    <td align="center">
        <img src="https://github.com/ivanseibel/react-query/blob/main/src/static/printscreen-04.png" alt="printscreen-04.png">
    </td>
  </tr>
</table>
