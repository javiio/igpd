import React from 'react';
import { setMinutes, setHours } from 'date-fns';
import { Label, Input } from '../';

interface TimePickerProps {
  date: Date
  label: string
  onChange?: (date: Date) => Promise<void>
};

export const TimePicker = ({ date, label, onChange }: TimePickerProps) => {
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const [hours, minutes] = e.target.value.split(':');
    const _date = setMinutes(setHours(date, parseInt(hours)), parseInt(minutes));
    if (onChange) {
      await onChange(_date);
    }
  };

  return (
    <form className="inline-block">
      <Label className="block mb-1 text-sm">{label}</Label>
      <div className="relative">
        <div className="absolute inset-y-0 end-0 top-0 flex items-center pe-3.5 pointer-events-none">
          <svg className="w-4 h-4 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd"/>
          </svg>
        </div>
        <Input
          value={date.toTimeString().slice(0, 5)}
          onChange={handleOnChange}
          type="time"
          className="text-sm px-2 py-1"
        />
      </div>
    </form>
  );
};
