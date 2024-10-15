import { useEffect, useRef, useState } from 'react';
import { CountdownTimerProps, formatTime } from './CountdownTimer.constant';

const CountdownTimer = ({
  seconds,
  setDisable,
  isCounting,
  hidden,
  setCounting
}: CountdownTimerProps) => {
  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef<number>();

  useEffect(() => {
    setCountdown(seconds);
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId.current);
  }, [isCounting]);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      setDisable();
      setCounting(false);
    }
  }, [countdown]);

  return (
    <>
      {(!hidden) && (<span>({formatTime(countdown)})</span>)}
    </>
  );
};

export default CountdownTimer;
