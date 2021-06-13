# Stock-Exchange Project

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This is a multipage stock exchange data website.
This project is based on [Financial Modeling Prep](https://financialmodelingprep.com/), you can find all of the API endpoints here: [Free Stock API and Financial Statements API - FMP API](https://financialmodelingprep.com/developer/docs/).
The website was created according to the specification. The main reqiurements:

*	Create a website that has a simple search input, with a search button.
*	When the button is clicked, the website should present 10 search results from the company search in    the Free Stock API, when searching in Nasdaq.
* Present the result as a list to the user.
* Add loading indicator when making the search.
* Each item in the list should show the company name and symbol.
* Add extra information to search results - image and stock change (percentage).
* In the result list, present the searched part in the result in a highlighted background (both the   company name, and company symbol, because this are is what is searched in the API)
* Present the company information in the screen with the company image, name, description and link.
* Present the company stock price, and changes in percentages - if the change is negative, the changes in percentages should be in light green, else in red.
* Present history of stock price of the company in a chart.
* Show loading indicator, when loading company data and stock price history.
* Create a marquee at the top of the main page showing current stock information.
* Animate the the marquee, to look like in a stock market (use keyframes and animation property in CSS).


## Technologies
Project is created with:
* Javascript
* Node.js
* Bootstrap
	
## Setup
To run this project, install it locally using npm:

```
$ npm install
$ npm start
$ cd client
Right click on index.html -> Open with Live Server
```