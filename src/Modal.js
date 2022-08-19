import React, { useEffect, useRef  } from "react";
import { faker } from '@faker-js/faker';
import './App.css';


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

const Modal = (props) => {
    const modalRef = useRef()

    // useRef hook lets you select a specific element via the DOM
    const handleClick = (e) => {
        // checking if the referenced element is the same as what you clicked on
        if(modalRef.current === e.target){
            props.closeModal(false)
        }
    }

    // refernce applied to the gray background for the modal not the card itself
    return (
        <div className="modalOverlay" ref={modalRef} onClick={handleClick}>
            <div className="animalModal">
                <img className="catPic" src={cat.catImage} alt="animal"/>
                <div>
                    <h3>{cat.catName}</h3>
                    <p>Seller: {cat.sellerName}</p>
                    <p>Cost: £{cat.catCost}</p>
                    <p>Location: {cat.sellerLocation}</p>
                    <button onClick={() => props.closeModal(false)}>Close Modal</button>
                </div>
            </div>
        </div>
    )
}

export default Modal