import style from './ShoppingForm.module.css'
import React, {useState} from "react";

function ShoppingForm (props)
{
    let [paymentOption, setPaymentOption] = useState();
    let [deliveryOption, setDeliveryOption] =useState("delivery");
    let cardCreds=<div className={style.Creds}>
                    <input className={style.cardCredsName} type="text" placeholder="name and surname" onChange={updateNameAndSurname}></input>
                    <input id={style.cardCredsNumber} type="number" placeholder="credit card number" onChange={updateCardCredsNumber}></input>
                    <input id={style.cardCredsCVV} type="number" placeholder="CVV" onChange={updateCVV}></input>
                   </div>

    let giftCardCreds=<div className={style.giftcardCreds}>
                        <input id={style.giftCardNumber} type="number" placeholder="giftcard code" onChange={updateGiftcardCode}></input>
                      </div>
    let personalCreds=<div className={style.Creds}>
                        <input className={style.cardCredsName} type="text" placeholder="name and surname" onChange={updateNameAndSurname}></input>
                        <input id={style.address} type="text" placeholder="address" onChange={updateAdress}></input>
                        <input id={style.postalCode} type="text" placeholder="postal code" onChange={updatePostalCode}></input>
                     </div>
    let personalCreds2=<div className={style.Creds2}>
    <input id={style.address2} type="text" placeholder="address" onChange={updateAdress}></input>
    <input id={style.postalCode2} type="text" placeholder="postal code" onChange={updatePostalCode}></input>
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
        <form action="submit" className={style.form}>
            <div id="itemQuant">
            <h1 className={style.element}>{props.element}</h1>
                <br/>
            <div className={style.itemContainer} style={props.styles}></div>
                
                <input id={style.quantity} type="number" onChange={(e)=>updateNumber(e)} placeholder="qty"></input>
            </div>
            {/* <input type="text" onChange={(e)=>updateText(e)} placeholder="put name and surname here"></input> */}
            
            <select value={paymentOption} onChange={updatePaymentOption}>
                <option value="">select payment option</option>
                <option value='debit card'>debit card</option>
                <option value='giftcard'>giftcard</option>
                <option value='kidney'>kidney</option>
            </select>
            {paymentOptionForm()}
            <div id={style.radioHolders}>
                <label>
                    <input className={style.radio} type="radio" value="pick up" checked={deliveryOption==='pick up'} onChange={updateDeliveryOption}></input> 
                    pick up   
                </label>
                <label>
                    <input className={style.radio} type="radio"  checked={deliveryOption==='delivery'} value="delivery" onChange={updateDeliveryOption}></input>
                    delivery
                </label>
            </div>

            {deliveryOptionForm()}
            <button className={style.submitButton}>Submit an order</button>
            
            </form>
            
        </>
    );
}

export default ShoppingForm;