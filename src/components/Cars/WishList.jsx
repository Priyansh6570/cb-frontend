import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, getWishlist } from '../../actions/userAction';
import { FaHeart } from 'react-icons/fa';
import { useAlert } from 'react-alert';

const WishList = ({ carId }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    // Check if the user object is available and the car is in the user's wishlist
    if (isAuthenticated && user && user.wishList.includes(carId)) {
      setIsAdded(true);
    }
  }, [isAuthenticated, user, carId]);

  const handleAddToWishlist = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(carId));
      alert.success('Added to wishlist');
      setIsAdded(true);
    } else {
      // Handle case when user is not logged in
      // You can show a message or redirect to login page
      alert.error('Please login to add to wishlist');
    }
  };

  const handleRemoveFromWishlist = () => {
    if (isAuthenticated) {
      dispatch(addToWishlist(carId));
      alert.success('Removed from wishlist');
      setIsAdded(false);
    } else {
      alert.error('Please login to add to wishlist');
    }
  };

  // Fetch the wishlist on component mount to update the wishlist data
  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  return (
    <div className='sm:absolute bg-white p-2 rounded-md sm:top-[-78.5rem] sm:left-[22rem] xs:top-[-78.5rem] pr-1 xs:left-[18rem]'>
      {isAdded ? (
        <span
          onClick={handleRemoveFromWishlist}
          className='shortList flex gap-2 items-center cursor-pointer pl-4'
        >
          <FaHeart className='text-red-500 font-lg' />
          <h3 className='font-light text-base'>Shortlist</h3>
        </span>
      ) : (
        <span
          onClick={handleAddToWishlist}
          className='shortList flex gap-2 items-center cursor-pointer pl-4'
        >
          <FaHeart className='text-[#ffcfcf] font-lg' />
          <h3 className='font-light text-base'>Shortlist</h3>
        </span>
      )}
    </div>
  );
};

export default WishList;
