import { useState, useEffect } from 'react';
import { API_KEY, API_URL } from '../config';
import {Basket} from '../components/Basket'
import { BasketList } from '../components/BasketList';
import { Preloader }  from "../components/Preloader";
import { GoodsList } from "../components/GoodsList"
import { InfoBasket } from '../components/InfoBasket';

function Main() {
    const [goods, setGoods] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [isBasketShow, setBasketShow] = useState(false);
    const [alertName, setAlertName] = useState('');

    const addToBasket = item => {
      const itemIndex = order.findIndex(orderItem => orderItem.id === item.id);
  
      if (itemIndex < 0) {
        const newItem = {
          ...item,
          quantity: 1,
        };
        setOrder([...order, newItem]);
      } else {
        const newOrder = order.map((orderItem, index) => {
          if (index === itemIndex) {
            return {
              ...orderItem,
              quantity: orderItem.quantity + 1,
            };
          } else {
            return orderItem;
          }
        });
  
        setOrder(newOrder);
      }
      setAlertName(item.name);
    };

    const removeBasket = itemId => {
      const newOrder = order.filter(el => el.id !== itemId);
      setOrder(newOrder);
    };

    const incQuantity = itemId => {
      const newOrder = order.map(el => {
        if (el.id === itemId) {
          const newQuantity = el.quantity + 1;
          return {
            ...el,
            quantity: newQuantity,
          }
        } else {
          return el;
        }
      });
      setOrder(newOrder);
    };

    const decQuantity = itemId => {
      const newOrder = order.map(el => {
        if (el.id === itemId) {
          const newQuantity = el.quantity - 1;
          return {
            ...el,
            quantity: newQuantity >= 0 ? newQuantity : 0,
          }
        } else {
          return el;
        }
      });
      setOrder(newOrder);
    };

    const handleBasketShow = () => {
      setBasketShow(!isBasketShow);
    };

    const closeAlert = () => {
      setAlertName('');
    }

    useEffect(function getGoods() {
        fetch(API_URL, {
            headers: {
              Authorization: API_KEY,
            }
        })
        
        .then(response => response.json())
        .then(data => {
            data.shop && setGoods(data.shop);
            setLoading(false);
        });
    }, []);

    return (
      <main className="content">
          <div className="container">
              <div className='basket_all'>
                <Basket quantity={order.length} handleBasketShow={handleBasketShow} />
                {isBasketShow && (
                  <BasketList 
                  order={order} 
                  handleBasketShow={handleBasketShow} 
                  removeBasket={removeBasket}
                  incQuantity={incQuantity}
                  decQuantity={decQuantity}
                  />
                )}
              </div>
              {loading ? (
                <Preloader />
              ) : (
                <GoodsList goods={goods} addToBasket={addToBasket} />
              )}
              {alertName && <InfoBasket name={alertName} closeAlert={closeAlert} />}
              
          </div>
      </main>
    );
}
export {Main}