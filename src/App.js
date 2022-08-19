import React, { useState, useEffect } from "react";
import { faker } from '@faker-js/faker';
import basket from "./images/cart.png";
import './App.css';





function App() {
  const [errorMsg, setErrorMsg] = useState('');
  const [cats, setCats] = useState([]);
  const [sidebar, setSidebar] = useState (false);



  useEffect(() => {
    async function fetchData() {
      try {
        setErrorMsg('')
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");

        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json();
        const catData = data.map((cat, index) => {
          return {
            catImage: cat.url,
            catName: faker.name.firstName(),
            sellerName: faker.internet.userName(),
            sellerLocation: faker.address.country(),
            catCost: faker.finance.amount()
          }
        })
        setCats(catData)

      }
      catch (error) {
        setErrorMsg(`Oops something went wrong... ${error.message}`)
        console.log(error.message)
      }
    }

    fetchData()
  }, [])

  if (errorMsg !== '') {
    return <h1>{errorMsg}</h1>
  }

  return (
    <div className="App">
      <div className="nav">
        <h2>Cats4Lyf</h2>
        <div className="basketBanner">
          <button className="basketButton">
            <img className="basketIcon" src={basket} alt="basket pic"></img>
          </button>
        </div>
      </div>

      <div className="basket-sidebar">
        <h2>Your Cart:</h2>
        <div className="basket-links">
          <div className="image">
            <img src="//unsplash.it/70/70"></img>
          </div>
          <div className="basket-links-info">
            <li>Cat Price</li>
            <li>Cat Price</li>
          </div>
        </div>
        <div className="overlay" onClick>
        </div>
      </div>

      <div className="catList">

        {cats.map((cat, index) => {
          return (
            <div className="catItem" key={index}>
              <img className="catPic" src={cat.catImage} alt="cat pic"></img>
              <div className="catItemInner">
                <div className="catInfo"> {cat.catName} </div>
                <p>Seller: {cat.sellerName}</p>
                <p>Cost: £{cat.catCost}</p>
                <p>Location: {cat.sellerLocation}</p>
                <button className="catButton">Add to basket</button>
              </div>
            </div>
          )
        })}

      </div>
    </div>
  );
}

export default App;
