import { useEffect, useState } from 'react';
import { resInfoUrl } from '../utils/constants';
const useRestaurantMenu = (resId) => {
  const [resInfo, setResInfo] = useState(null);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await fetch(resInfoUrl + resId);
    const jsonData = await response.json();
    setResInfo(jsonData?.data);
  };
  return resInfo;
};
export default useRestaurantMenu;
