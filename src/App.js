import React, { useState, useEffect } from "react";
import { faker } from '@faker-js/faker';
import basket from "./images/cart.png";
import './App.css';
import Modal from './Modal'

function App() {
  const [errorMsg, setErrorMsg] = useState('');
  const [cats, setCats] = useState([]);
  const [basketCats,setBasketCats] = useState([]);
  const [basketCount,setBasketCount] = useState(0);
  const [show, setShow] = useState(false);
  const [selectedAnimal, setSelectedAnimal] = useState({});

const ScrollToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'});
  };
  return (
    <div>
      <button type='button' onClick={scrollToTop} className="catButtonBTT">Back to top</button>
    </div>
  )
};

  useEffect(() => {
    async function fetchData() {
      try {
        setErrorMsg('')
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
        
        if(!response.ok) {
          throw new Error(response.statusText)
        }

        const data = await response.json();
        const catData = data.map((cat, index) => {
          return {
            catImage: cat.url,
            catName: faker.name.firstName(),
            sellerName: faker.internet.userName(),
            sellerLocation:faker.address.country(),
            catCost:faker.finance.amount()
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

  if(errorMsg !== '') {
    return <h1>{errorMsg}</h1>
  }


  function addToBasket(c) {
    let bCats = basketCats;
    bCats.push(c);
    setBasketCats(bCats);

    setBasketCount(basketCats.length);
  }

  const handleClick = (animalObj) => {
    setSelectedAnimal(animalObj)
    setShow(true)
  }

  return (
    <>
    <div className="App">
        
      <div className="basketBanner">

        <button className="basketButton">
          <img className="basketIcon" src = {basket}  alt="basket pic"></img>
          <p className="basketCount">{basketCount}</p>
        </button>

      </div>

      <div className="catList">

        {cats.map((cat, index) => {
          return (
              <div className="catItem" key={index}>
                <img className="catPic" src = {cat.catImage} alt="cat pic"></img>
                <div className="catItemInner">
                  <div className="catInfo"> {cat.catName} </div>
                  <p>Seller: {cat.sellerName}</p>
                  <p>Cost: £{cat.catCost}</p>
                  <p>Location: {cat.sellerLocation}</p>
                  <div>
                    <button onClick={()=> addToBasket(cat)} className="catButton">Add to basket</button>
                    <button onClick={() => handleClick(currentAnimal)} className="catButton">Learn More</button>
                  </div>
                </div>
              </div>
          )
        })}
        {show && <Modal closeModal={setShow} animal={selectedAnimal} />}

      </div>

    </div>
    <ScrollToTop />
    </>
  );
}

export default App;
