import { cdn_url } from '../utils/constants';
const RestaurantCard = (props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, costForTwo, sla, avgRating } =
    resData?.info;
  return (
    <div className="rest-card">
      <img src={cdn_url + cloudinaryImageId} />
      <h4>{name}</h4>
      <h4>{cuisines.join(',')}</h4>
      <h4> {avgRating} stars</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla?.slaString}</h4>
    </div>
  );
};
export default RestaurantCard;

export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="bg-red-500 text-white rounded-lg absolute p-2 m-2">
          Promoted
        </label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};
