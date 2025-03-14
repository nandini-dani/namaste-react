import RestaurantCard, { withPromotedLabel } from './RestaurantCard';
import { restListUrl } from '../utils/constants';
import { useContext, useEffect, useState } from 'react';
import ShimmerUI from './ShimmerUI';
import { Link } from 'react-router';
import useOnlineStatus from '../utils/useOnlineStatus';
import UserContext from '../utils/UserContext';
const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const bool = false;
  const { userName, setUserName } = useContext(UserContext);
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);
  useEffect(() => {
    console.log('useEffect');
    fetchData();
  }, []);

  const fetchData = async () => {
    console.log('fetch');
    const responseData = await fetch(restListUrl);
    const jsonData = await responseData.json();
    console.log(
      'fetch data',
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setListOfRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    setFilteredRestaurants(
      jsonData?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants
    );
    console.log(filteredRestaurants);
  };

  const onlineStatus = useOnlineStatus();
  if (onlineStatus === false) return <h2>Sorry you are offline!!!</h2>;

  return filteredRestaurants?.length === 0 ? (
    <ShimmerUI />
  ) : (
    <div>
      <div className="filter-container">
        <button
          className="filter-btn border-solid border-black border-2 p-2 m-2"
          onClick={() => {
            const filteredList = listOfRestaurants.filter(
              (res) => res?.info?.avgRating > 4
            );
            setFilteredRestaurants(filteredList);
          }}
        >
          Top Restaurants
        </button>
        <input
          className="border-solid border-black border-2 p-2 m-2"
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        ></input>
        <button
          className="search-btn border-solid border-black border-2 p-2 m-2"
          onClick={() => {
            const filterData = listOfRestaurants.filter((res) => {
              return res?.info?.name
                ?.toLowerCase()
                .includes(searchText.toLowerCase());
            });
            setFilteredRestaurants(filterData);
          }}
        >
          Search
        </button>
        <div>
          Name:
          <input
            className="border-solid border-black border-2 p-2 m-2"
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          ></input>
        </div>
      </div>

      <div className="rest-container">
        {filteredRestaurants?.map((res) => (
          <Link key={res?.info?.id} to={'/restaurant/' + res?.info?.id}>
            {bool ? (
              <RestaurantCardPromoted resData={res} />
            ) : (
              <RestaurantCard resData={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Body;
