import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event = event.target.value;
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map(()=>{
      if (cartItems[cartItems._id]>0){
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,

    } 
    let response = await axios.post(url+"/api/order/place",orderData,{headers:{token}}) 
    if (response.data.success) {
      const {session_url} = response.data;
      window.location.replace(session_url);
    }
    else{
      alert("Error");
    }
  }

  return (
    <div>
      <form  onSubmit={placeOrder} className='place-order'>
        <div className="place-order-left">
            <p className="title">Delivery Information</p>
            <div className="multi-fields">
              <input required name='firstName' onChange={onChangeHandler} vlaue={data.firstName} type="text" placeholder="First name"/>
              <input required name='lastName' onChange={onChangeHandler} vlaue={data.lastName} type="text" placeholder="Last name"/>
            </div>
            <input required name='email' onChange={onChangeHandler} vlaue={data.email} on type="text" placeholder="Email address"/>
            <input required name='street' onChange={onChangeHandler} vlaue={data.street} type="text" placeholder="Street"/>
            <div className="multi-fields">
              <input required name='city' onChange={onChangeHandler} vlaue={data.city} type="text" placeholder="City" />
              <input required name='state' onChange={onChangeHandler} vlaue={data.state} type="text" placeholder="State" />
            </div>
            <div className="multi-fields">
              <input required name='zipcode' onChange={onChangeHandler} vlaue={data.zipcode} type="text" placeholder="Zip code" />
              <input required name='country' onChange={onChangeHandler} vlaue={data.country} type="text" placeholder="Country" />
            </div>
            <input required name='phone' onChange={onChangeHandler} vlaue={data.phone} type="text" placeholder="Phone"></input>
        </div>
        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
          <div className="cart-total-details">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <p>Delivery Fee</p>
            <p>${getTotalCartAmount()===0?0:2}</p>
          </div>
          <hr />
          <div className="cart-total-details">
            <b>Total</b>
            <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
          </div>

          </div>
          
          <button type='submit'>PROCEED TO PAYMENT</button>
        </div>

        </div>
      </form>
    </div>
  )
}

export default PlaceOrder