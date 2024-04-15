import { IoIosStar, IoIosStarOutline } from "react-icons/io";

const StarRating = ({ rating, size }: { rating: number; size: number }) => (
  <div className="flex">
    {rating >= 1 ? (
      <IoIosStar size={size} className="fill-orange-300" />
    ) : (
      <IoIosStarOutline size={size} className="fill-orange-300" />
    )}
    {rating >= 2 ? (
      <IoIosStar size={size} className="fill-orange-300" />
    ) : (
      <IoIosStarOutline size={size} className="fill-orange-300" />
    )}
    {rating >= 3 ? (
      <IoIosStar size={size} className="fill-orange-300" />
    ) : (
      <IoIosStarOutline size={size} className="fill-orange-300" />
    )}
    {rating >= 4 ? (
      <IoIosStar size={size} className="fill-orange-300" />
    ) : (
      <IoIosStarOutline size={size} className="fill-orange-300" />
    )}
    {rating >= 5 ? (
      <IoIosStar size={size} className="fill-orange-300" />
    ) : (
      <IoIosStarOutline size={size} className="fill-orange-300" />
    )}
  </div>
);

export default StarRating;
