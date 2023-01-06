import React, { useState, useReducer } from 'react';
// import data from '../data.js'
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Loader from './Loader';

import Car from './Car';
import { Helmet } from 'react-helmet-async';

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, cars: action.payload, error: '' };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

const NewCar = () => {
  const [{ loading, error, cars }, dispatch] = useReducer(logger(reducer), {
    loading: true,
    cars: [],
    error: '',
  });

  // const [cars, setCars] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      try {
        const result = await axios.get('http://localhost:5000/api/cars');
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
        // setCars(result.data);
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR', payload: error.message });
      }
    };
    fetchData();
  }, []);

  return (
    <section className='mb-16'>
      <div className="car-cotainer sm:bg-slate-200 flex w-[86%] sm:w-full m-auto flex-wrap gap-3 mt-4 sm:py-4">
        {loading ? (
          <Loader />
        ) : error ? (
          <div className="error">{error}</div>
        ) : cars.length === 0 ? (
          <div className="error">No cars found</div>
        ) : (
          cars.length > 0 &&
          cars.map((car) => {
            return (
              <Link to={`/car/${car.id}`} key={car.id}>
                <Helmet>
                  <title>New Cars</title>
                </Helmet>
               <Car car={car} />
              </Link>
            );
          })
        )}
      </div>
    </section>
  );
};

export default NewCar;
