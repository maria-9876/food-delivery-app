import React, { useContext, useEffect, useState } from 'react';
import './MyOrders.css';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        url + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      // Optional: clean up or validate response data
      const orders = response.data?.data || [];

      // Only keep orders that have an items array
      const cleanedOrders = orders.filter(order => Array.isArray(order.items));
      setData(cleanedOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order, index) => (
          <div key={index} className='my-orders-order'>
            <img src={assets.parcel_icon} alt="Parcel Icon" />
            <p>
              {order.items?.map((item, idx) => {
                const isLast = idx === order.items.length - 1;
                return `${item.name} x ${item.quantity}${isLast ? '' : ', '}`;
              })}
            </p>
            <p>{currency}{order.amount}.00</p>
            <p>Items: {order.items?.length || 0}</p>
            <p><span>&#x25cf;</span> <b>{order.status}</b></p>
            <button onClick={fetchOrders}>Track Order</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
