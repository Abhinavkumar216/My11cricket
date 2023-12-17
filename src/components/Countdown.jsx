import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';

const CountdownTimer = ({remaining}) => {
  const [counter, setCounter] = useState(0);
  const [isExpired, setIsExpired] = useState(false);

  useEffect(() => {
    setCounter(Math.floor(remaining / 1000) - Math.floor(Date.now() / 1000));
  }, [remaining]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (counter <= 0) {
        setIsExpired(true);
        clearInterval(intervalId);
      } else {
        setCounter(prevCounter => prevCounter - 1);
        setIsExpired(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [counter]);

  function msToTime(sec) {
    let hours = Math.floor(sec / 3600);
    hours >= 1 ? (sec = sec - hours * 3600) : (hours = '00');
    let min = Math.floor(sec / 60);
    min >= 1 ? (sec = sec - min * 60) : (min = '00');
    sec < 1 ? (sec = '00') : void 0;
    min.toString().length === 1 ? (min = '0' + min) : void 0;
    sec.toString().length === 1 ? (sec = '0' + sec) : void 0;

    return hours + 'h ' + min + 'm ';
  }

  return (
    <Text className="text-xs font-WorksansMedium text-red-600 ml-2 bg-red-50 px-3 py-1 rounded-md">
      {isExpired ? 'Expired' : msToTime(counter)}
    </Text>
  );
};

export default CountdownTimer;
