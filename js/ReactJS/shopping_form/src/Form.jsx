import React, {useState} from "react";
import ItemForSell from "./ItemForSell";

function Form ()
{
    let [numberVar, setNumber] = useState(0);
    let [paymentOption, setPaymentOption] = useState();
    let [deliveryOption, setDeliveryOption] =useState("delivery");
    let [nameAndSurname,setNameAndSurname] =useState();
    let [CardCredsNumber,setCardCredsNumber] =useState();
    let [CVV, setCVV] =useState();
    let [giftcardCode,setGiftcardCode] =useState();
    let [address,setAddress] =useState();
    let [postalCode, setPostalCode]=useState();
    let cardCreds=<div className="Creds">
                    <input className='cardCredsName' type="text" placeholder="name and surname" onChange={updateNameAndSurname}></input>
                    <input id='cardCredsNumber' type="number" placeholder="credit card number" onChange={updateCardCredsNumber}></input>
                    <input id='cardCredsCVV' type="number" placeholder="CVV" onChange={updateCVV}></input>
                   </div>

    let giftCardCreds=<div className="giftcardCreds">
                        <input id='giftCardNumber' type="number" placeholder="giftcard code" onChange={updateGiftcardCode}></input>
                      </div>
    let personalCreds=<div className="Creds">
                        <input className='cardCredsName' type="text" placeholder="name and surname" onChange={updateNameAndSurname}></input>
                        <input id='address' type="text" placeholder="address" onChange={updateAdress}></input>
                        <input id='postalCode' type="text" placeholder="postal code" onChange={updatePostalCode}></input>
                     </div>
    let personalCreds2=<div className="Creds2">
    <input id='address2' type="text" placeholder="address" onChange={updateAdress}></input>
    <input id='postalCode2' type="text" placeholder="postal code" onChange={updatePostalCode}></input>
 </div>
    
    function updateNameAndSurname(e) 
    {
        setNameAndSurname(e.target.value);   
    }

    function updateNumber(e)
    {
        setNumber(e.target.value);
    }

    function updatePaymentOption(e)
    {
        setPaymentOption(e.target.value);
           
    }

    function updateDeliveryOption(e)
    {
        setDeliveryOption(e.target.value);
    }

    function updateCardCredsNumber(e)
    {
        setCardCredsNumber(e.target.value);
    }
    function updateCVV(e)
    {
        setCVV(e.target.value)
    }

    function updateGiftcardCode(e)
    {
        setGiftcardCode(e.target.value)
    }
    function updateAdress(e)
    {
        setAddress(e.target.value)
    }
    function updatePostalCode(e)
    {
        setPostalCode(e.target.value);
    }
    function paymentOptionForm()
    {
        if(paymentOption==='debit card')
        {
            return cardCreds;
        }
            
        else if(paymentOption==='giftcard')
        {
            return giftCardCreds;
        }

        else if(paymentOption==='kidney')
        {
            return personalCreds;
        }
        
    }
    function displayGivenCredentials()
    {
        let givenCredentials=[];
        givenCredentials.push(<p>selected quantity: {numberVar}</p>);
        givenCredentials.push(<p>selected payment option:{paymentOption}</p>);

        if(deliveryOption==='delivery')
        {
            givenCredentials.push(<p>name and surname: {nameAndSurname}</p>);
            givenCredentials.push(<p>provided address: {address}</p>);
            givenCredentials.push(<p>entered postal code: {postalCode}</p>);
            if(paymentOption==='debit card')
            {
                givenCredentials.push(<p>debit card number: {CardCredsNumber}</p>);
                givenCredentials.push(<p>cvv code: {CVV}</p>);
            }
            else if(paymentOption==='giftcard')
            {
                givenCredentials.push(<p>provided gift card code: {giftcardCode}</p>);
            }
        }
        else if(deliveryOption==="pick up")
        {
            if(paymentOption==='debit card')
                {
                    givenCredentials.push(<p>name and surname: {nameAndSurname}</p>);
                    givenCredentials.push(<p>debit card number: {CardCredsNumber}</p>);
                    givenCredentials.push(<p>cvv code: {CVV}</p>);
                }
                else if(paymentOption==='giftcard')
                {
                    givenCredentials.push(<p>provided gift card code: {giftcardCode}</p>);
                }
                else if(paymentOption==='kidney')
                {
                    givenCredentials.push(<p>name and surname: {nameAndSurname}</p>);
                    givenCredentials.push(<p>provided address: {address}</p>);
                    givenCredentials.push(<p>entered postal code: {postalCode}</p>);
                }
        }

        return (givenCredentials);
    }

    function deliveryOptionForm()
    {
        if(deliveryOption==='delivery'&&paymentOption!=='kidney')
        {
            if(deliveryOption==='delivery'&&paymentOption==='debit card')
            {
                return personalCreds2;
            }
            return personalCreds;
        }        
    }
    
    return(
        
        <>
        <form action="submit">
            <div id="itemQuant">
                <ItemForSell/>
                
                <input id="quantity" type="number" onChange={(e)=>updateNumber(e)} placeholder="qty"></input>
            </div>
            {/* <input type="text" onChange={(e)=>updateText(e)} placeholder="put name and surname here"></input> */}
            
            <select value={paymentOption} onChange={updatePaymentOption}>
                <option value="">select payment option</option>
                <option value='debit card'>debit card</option>
                <option value='giftcard'>giftcard</option>
                <option value='kidney'>kidney</option>
            </select>
            {paymentOptionForm()}
            <div id='radioHolders'>
                <label>
                    <input className="radio" type="radio" value="pick up" checked={deliveryOption==='pick up'} onChange={updateDeliveryOption}></input> 
                    pick up   
                </label>
                <label>
                    <input className="radio" type="radio"  checked={deliveryOption==='delivery'} value="delivery" onChange={updateDeliveryOption}></input>
                    delivery
                </label>
            </div>

            {deliveryOptionForm()}
            {displayGivenCredentials()}
            <button>Submit an order</button>
            
            </form>
            
        </>
    );
}

export default Form;