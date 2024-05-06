import React, { useState, useEffect } from 'react';
import { differenceInMinutes, addMinutes, subMinutes } from 'date-fns';
import { TimePicker, Label, Input } from '../';

interface TimeIntervalProps {
  start: Date
  end: Date
  onChange: (start: Date, end: Date) => void | Promise<void>
};

export const TimeInterval = ({ start, end, onChange }: TimeIntervalProps) => {
  const [diff, setDiff] = useState(differenceInMinutes(end, start));

  useEffect(() => {
    setDiff(differenceInMinutes(end, start));
  }, [start, end]);

  const handleChangeStart = async (date: Date) => {
    if (date > end) {
      await onChange(date, addMinutes(end, diff));
    } else {
      await onChange(date, end);
    }
  };

  const handleChangeEnd = async (date: Date) => {
    if (date < start) {
      await onChange(subMinutes(start, diff), date);
    } else {
      await onChange(start, date);
    }
  };

  return (
    <div className="flex space-x-2">
      <TimePicker date={start} label="From:" onChange={handleChangeStart} />
      <TimePicker date={end} label="To:" onChange={handleChangeEnd} />
      <div>
        <Label className="block mb-1 text-sm">Duration:</Label>
        <Input type="number" value={diff} className="text-sm px-2 py-1 w-16 inline-block" />
        <span className="text-xs ml-1 inline-block">mins.</span>
      </div>
    </div>
  );
};
