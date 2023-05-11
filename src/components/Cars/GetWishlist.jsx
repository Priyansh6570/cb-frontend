import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist, addToWishlist } from '../../actions/userAction';
import { FaHeart, FaTimes } from 'react-icons/fa';
import Car from './Car';
import Loader from '../Layout/Loader/Loader'
import '../../styles/shortlist.scss'

const GetWishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, loading, error } = useSelector((state) => state.wishlist);

  useEffect(() => {
    dispatch(getWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = (carId) => {
    dispatch(addToWishlist(carId));
  };

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return loading ? (
    <Loader />
  ) : (
    <div>
      <div className="shortlist-banner w-[70vw] sm:w-full bg-[#000000b9] mx-auto m-8 h-[200px] sm:h-[150px] rounded-2xl ">
      <h2 className='text-[30px] sm:text-white xs:top-[0.9rem] xs:text-black sm:top-[1.4rem] sm:left-[-20px] font-sans font-bold relative top-8 left-[-400px] p-8 justify-center flex'>Shortlist</h2>
      </div>
      {wishlist && wishlist.length === 0 ? (
        <p className='text-[30px] sm:m-10 xs:top-[0.9rem] xs:text-black  font-sans font-bold mx-auto p-8 justify-center flex'>No Cars in Shortlist</p>
      ) : (
        <ul className='flex rounded-2xl mb-14 p-6 sm:flex-col m-4 sm:m-1 sm:mr-2 sm:p-0 gap-6 flex-wrap justify-center w-[70vw] mx-auto'>
          {wishlist && wishlist.map((car) => (
            <li key={car._id} className='self-center'>
             {car && car.image && <Car car={car} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  ); 
};

export default GetWishlist;
