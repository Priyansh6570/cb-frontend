import React, { useState, useEffect } from 'react';
import DealerSubscription from './DealerSubscription.jsx';
import BrokerSubscription from './BrokerSubscription.jsx';
import UserCreditDetail from './UserCreditDetail.jsx';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import NewCar from './NewCar';

const CreateCar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [userCredit, setUserCredit] = useState(null); // Track user's credit

  useEffect(() => {
    if (user && (user.role === 'dealer' || user.role === 'broker')) {
      setUserCredit(user.expireLimit); // Set user's credit
    }
  }, [user]);

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  if (user && user.role === 'dealer' && userCredit === 0) {
    return <DealerSubscription />;
  } else if (user && user.role === 'broker' && userCredit === 0) {
    return <BrokerSubscription />;
  } else if (user && user.role === 'user' && userCredit === 0) {
    return <UserCreditDetail />;
  } else {
    return <NewCar />
  }
};

export default CreateCar;
