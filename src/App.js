import React, { useState, useEffect } from "react";
import basket from "./images/cart.png";
import './App.css';

function App()
{
  const [errorMsg, setErrorMsg] = useState('');
  const [cats, setCats] = useState([]);



  useEffect(() =>
  {
    async function fetchData()
    {
      try {
        setErrorMsg('')
        const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10");
        
        if(!response.ok)
        {
          throw new Error(response.statusText)
        }

        const data = await response.json();
        setCats(data)

      } 
      catch (error)
      {
        setErrorMsg(`Oops something went wrong... ${error.message}`)
        console.log(error.message)
      }
    }
    
    fetchData()
  }, [])

  if(errorMsg !== '')
  {
    return <h1>{errorMsg}</h1>
  }

  return (
    <div className="App">
        
      <div className="basketBanner">

        <button className="basketButton">
          <img className="basketIcon" src = {basket}  alt="basket pic"></img>
        </button>

      </div>


      <div className="catList">

        {cats.map((cat, index) => 
        {
          return (
              <div className="catItem">
                <img className="catPic" src = {cat.url} alt="cat pic"></img>
                <div className="catItemInner">
                  <div className="catInfo">cat info goes here</div>
                  <button className="catButton">Placeholder</button>
                  <p>Placeholder</p>
                </div>
              </div>
          )
        })}

      </div>

    </div>
  );
}

export default App;
