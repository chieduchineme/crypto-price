import data from "./api";
import { useEffect, useState, useCallback } from "react";
import Header from "./components/Layout/Header/Header";
import ThreeDotsHeader from "./components/Layout/Header/RightArrowHeader";
import Title from "./components/Layout/Title/Title";
import CoinsGrid from "./components/Coins/CoinsGrid/CoinsGrid";
import OrdinaryComponent from "./components/UI/Modal/AreaChart";
import "./index.css";
import { Form } from "react-bootstrap";
import BulletForGraphs from "./components/Coins/BulletForGraphs/BulletForGraph";
import BuySellButon from "./components/BuySellButtons/buySellButton";
import Footer from "./components/Layout/Footer/Footer";

const App = () => {
  const [search, setSearch] = useState("btc");
  const [searchFound, setSearchFound] = useState("yes");
  const [rateExceeded, setRateExceeded] = useState("no");
  const [currency, setCurrency] = useState("USD");
  const [homeData, setHomeData] = useState([]);
  const [chosenCoin, setChosenCoin] = useState("bitcoin");
  const [coinDetails, setCoinDetails] = useState({});
  const [coinData, setCoinData] = useState([]);
  const [lowestPriceValue, setLowestPriceValue] = useState([]);
  const [highestPriceValue, setHighestPriceValue] = useState(true);

  // Function to update setSearch with lowercase value
   // Wrap the definition of handleSearchChange in useCallback
  const handleSearchChange = useCallback((event) => {
    const lowercaseValue = event?.target?.value.toLowerCase();
    setTimeout(() => {
      setSearch(lowercaseValue);
        }, 5000);
    // eslint-disable-next-line
  }, [search]);
  function flattenObject(obj, separator = '.') {
    const result = {};
  
    function recurse(currentObj, currentKey) {
      for (const key in currentObj) {
        const newKey = currentKey ? currentKey + separator + key : key;
        if (typeof currentObj[key] === 'object' && currentObj[key] !== null) {
          recurse(currentObj[key], newKey);
        } else {
          result[newKey] = currentObj[key];
        }
      }
    }
  
    recurse(obj, '');
  
    return result;
  }

  useEffect(() => {
    if (chosenCoin !== null) {
      data
        .getHomeData(currency)
        .then((result) => {
          console.log(result.data)
          setHomeData(result.data);
          setRateExceeded("no");
          let ourCoin = homeData.find((coin) => coin.id.includes(search) || coin.symbol.includes(search));
          console.log(ourCoin);
          setSearchFound("yes")
          if (ourCoin == null) {
            setSearchFound("no");
            ourCoin = homeData.find((coin) => coin.id.includes('bitcoin')) 
          };
          setCoinDetails(ourCoin);
          setChosenCoin(ourCoin?.id);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            if (error.response.status === 429) { setRateExceeded("yes");  }
          } else if (error.request) {
            console.log(error.request);
          } else if (error.message) {
            console.log(error.message);
          }
        });
    }    // eslint-disable-next-line
  }, [currency, chosenCoin, search]);

  useEffect(() => {
    if (chosenCoin !== null ) {
      data
        .getCoinHistory(chosenCoin, currency)
        .then((result) => {
          setCoinData(result.data);
          setRateExceeded("no");
          const dataPrices = coinData.prices;
          const flattenedDataPrices = flattenObject(dataPrices);
          // Convert the values of the flattened object to an array
          const valuesPricesArray = Object.values(flattenedDataPrices);
          const oddIndexedValues = valuesPricesArray.filter((value, index) => index % 2 !== 0);
          // Find the highest and lowest values in the oddIndexedValues array
          const lowestValue = Math.min(...oddIndexedValues);
          const highestValue = Math.max(...oddIndexedValues);
          setHighestPriceValue(`$${lowestValue.toFixed(2)}`);
          setLowestPriceValue(`$${highestValue.toFixed(2)}`);
        })
        .catch((error) => {
          if (error.response) {
            console.log(error.response);
            if (error.response.status === 429) { setRateExceeded("yes");  }
          } else if (error.request) {
            console.log(error.request);
          } else if (error.message) {
            console.log(error.message);
          }
        });
    }    // eslint-disable-next-line
  }, [chosenCoin, currency, search]);

  return (
    <div style={{marginLeft: "4em"}}>
      <main>
          <Header currency={currency} setCurrency={setCurrency} coinName={coinDetails?.name}/>
          <ThreeDotsHeader />
          <Title />
          <>
            <CoinsGrid
              data={homeData}
              currency={currency}
              search={search}
              setChosenCoin={setChosenCoin}
              handleSearchChange={handleSearchChange} />
            { searchFound === "no" &&
              <div style={{marginBottom: "9.6em", marginLeft:"4em"}}>
                <p>NO COIN FOUND. Search for Another Coin</p>
                <p>Currently showing chart for Bitcoin(Btc)</p>
                <Form.Control type="text" placeholder="Re-Search For a Coin" onChange={handleSearchChange} />
              </div>
            }
            { rateExceeded === "yes" &&
              <div style={{marginBottom: "7.5em", marginLeft:"3em"}}>
                <h4>You've exceeded the Rate Limit.</h4>
                <p>Please visit https://www.coingecko.com/en/api/pricing to subscribe</p>
              </div>
            }
            <OrdinaryComponent
                coinHistory={coinData}
                chosenCoin={chosenCoin}
                coinInfo={homeData.filter((coin) => coin.id === chosenCoin)[0]} />
            <BulletForGraphs  lowestPriceValue={lowestPriceValue} highestPriceValue={highestPriceValue} 
                symbol={coinDetails?.symbol} price={coinDetails?.current_price}  
                coinInfo={homeData.filter((coin) => coin.id === chosenCoin)[0]}  />
          </>
        {/* )} */}
      </main>
      <BuySellButon symbol={coinDetails?.symbol} name={coinDetails?.name}
        coinInfo={homeData.filter((coin) => coin.id === chosenCoin)[0]} />
      <Footer style={{marginTop: "4em"}} />

    </div>
  );
};

export default App;
