import React, { useEffect, useState } from 'react';
import ShimmerUI from './ShimmerUI';
import { useParams } from 'react-router';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import { useDispatch } from 'react-redux';
import { addItem } from '../utils/cartSlice';
//import { addItem } from '../utils/cartSlice';

const RestaurantMenu = () => {
  const { resId } = useParams();
  const resInfo = useRestaurantMenu(resId);
  console.log('resInfo', resInfo);
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addItem('coke'));
  };

  if (resInfo === null) return <ShimmerUI />;

  const { name, cuisines } = resInfo?.cards[2]?.card?.card?.info;
  const { itemCards } =
    resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[3]?.card?.card;
  return (
    <div className="res-menu-container">
      <h2>{name}</h2>
      <h4>{cuisines.join(',')}</h4>
      <h4>Menu</h4>
      <li></li>
      {itemCards?.map((item) => (
        <li key={item?.card?.info?.id}>
          {item?.card?.info?.name} - Rs {item?.card?.info?.price / 100}
          <button
            className="p-2 m-2 text-white bg-black rounded-lg"
            onClick={handleAdd}
          >
            Add
          </button>
        </li>
      ))}
    </div>
  );
};

export default RestaurantMenu;
