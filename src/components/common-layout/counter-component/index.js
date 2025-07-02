import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

const CountDownComponent = ({ date, isSetTime }) => {
  const [remainingTime, setRemainingTime] = useState(getTimeDiff());

  function getTimeDiff() {
    const end = dayjs(date);
    const now = dayjs();
    const diff = end.diff(now, "second");

    if (diff <= 0) return null;

    const duration = dayjs.duration(diff, "seconds");

    return {
      days: Math.floor(duration.asDays()),
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds()
    };
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = getTimeDiff();
      if (!newTime) {
        clearInterval(interval);
        isSetTime?.(true);
      }
      setRemainingTime(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [date]);

  if (!remainingTime) {
    return <Text>{dayjs(date).format("MMM D, YYYY")}</Text>;
  }

  const { days, hours, minutes, seconds } = remainingTime;

  const parts = [];
  if (days > 0) parts.push(`${String(days).padStart(2, "0")}d`);
  if (hours > 0 || days > 0) parts.push(`${String(hours).padStart(2, "0")}h`);
  if (minutes > 0 || hours > 0 || days > 0)
    parts.push(`${String(minutes).padStart(2, "0")}m`);
  if (seconds >= 0) parts.push(`${String(seconds).padStart(2, "0")}s`);

  return <Text>{parts.join(" ")}</Text>;
};

export default CountDownComponent;
