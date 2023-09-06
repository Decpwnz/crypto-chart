### Live Demo
http://ec2-13-51-171-157.eu-north-1.compute.amazonaws.com:8080/

# Crypto Chart Documentation
Welcome to the documentation for the Crypto Chart app. This app allows you to track cryptocurrency prices with the possibility of selecting date range and staying updated on the latest market trends. 
## 1. Installation
To get started with the Crypto Chart app, follow these steps: 
### Prerequisites
+ Node.js installed on your computer
+ MongoDB installed on your computer
### Installation Steps
1. Clone the repository:
* `git clone git@github.com:Decpwnz/crypto-chart.git`
2. Navigate to the backend project folder:
* `cd crypto-chart/server`
3. Install dependencies:
* `yarn install`
4. Start the development server:
* `yarn start`
* The server should now be running on http://localhost:3001.
5. (Optional) For using a LOCAL_DB_CONNECTION_STRING_LOCAL environment variable from .env file open a new terminal and start a MongoDB:
* `mongod`
* Database should now be available on http://localhost:3001/cryptodb
6. Open a new terminal and navigate to the frontend project folder:
* `cd crypto-chart/client`
7. Install dependencies:
* `yarn install`
8. Start the development server:
* `yarn dev`
* The app should now be running on http://localhost:5173

## 2. Usage
The React Crypto App provides a user-friendly interface to interact with cryptocurrency data. Here are some of the main features:
* Market Overview: View a summary of the cryptocurrency market, including the total market cap and 24-hour change.
* Cryptocurrency Prices: Search for specific cryptocurrencies and see their current prices, market cap, and price charts.
* Historical Data: Access historical price data for a selected cryptocurrency and analyze its price trends over time.

## 3. Components
The Crypto Chart is built using various React components. You can find these components in the client/src/components directory. Here are some of the key components:
* `CoinsTable.jsx`: Renders a list of cryptocurrencies with their prices and market data.
* `CoinPage.jsx`: Displays detailed information about a selected cryptocurrency, including historical price charts.

Feel free to explore and customize these components to suit your needs.

## 4. API Reference
If you want to extend the app's functionality or integrate it with external APIs, here are the main API endpoints used in the Crypto Chart app:
* Cryptocurrency Data: The app fetches cryptocurrency data from the [CoinGecko API](https://www.coingecko.com/en/api).

You can refer to the respective API documentation for more details on their usage.

## 5. Known Errors and Expected Issues

While we strive to provide a smooth experience with the Crypto Chart app, there are some known errors and expected issues you should be aware of:

###  API Rate Limits
Issue: External API CoinGecko may have rate limits that could affect data fetching.
![CoinGecko API Rate Limits](https://i.imgur.com/e0Osvz5.png)

Solution: Wait 5 minutes until CoinGecko API gets unblocked and is available again or check the rate limits of the APIs you are using and consider implementing rate-limiting logic in your app to avoid hitting those limits.

### Invalid SearchBar Input
Issue: The app will not proceed to CoinPage and renders blank if a non-existent cryptocurrency coin name is entered.

Solution: Enter a valid cryptocurrency name i.e. bitcoin, tether, cardano, etc.
## 6. Contributing
We welcome contributions to the Crypto Chart. If you'd like to contribute, please follow these steps:
1. Fork the repository on GitHub.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.
4. Your pull request will be reviewed, and once approved, it will be merged into the master branch.


Thank you for using the Crypto Chart! If you have any questions or encounter any issues, please feel free to reach out or open an issue on GitHub.

Happy crypto tracking!
