export const formatTime = (time: number) => {
  let minutes = Math.floor(time / 60);
  let seconds = Math.floor(time - minutes * 60);

  let minutesString = minutes.toString();
  let secondsString = seconds.toString();

  if (minutes < 10) minutesString = '0' + minutes.toString();
  if (seconds < 10) secondsString = '0' + seconds;

  return minutesString + ':' + secondsString;
};

export interface CountdownTimerProps {
  seconds: number;
  setDisable: () => void;
  isCounting: boolean;
  hidden: boolean;
  setCounting: React.Dispatch<React.SetStateAction<boolean>>;
}
