import React from 'react';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps } from 'antd';
import type { Dayjs } from 'dayjs';

const { RangePicker } = DatePicker;

const getYearMonth = (date: Dayjs) => date.year() * 12 + date.month();

const disabled7DaysDate: DatePickerProps['disabledDate'] = (current, { from, type }) => {
  if (from) {
    const minDate = from.add(-6, 'days');
    const maxDate = from.add(6, 'days');

    switch (type) {
      case 'year':
        return current.year() < minDate.year() || current.year() > maxDate.year();

      case 'month':
        return (
          getYearMonth(current) < getYearMonth(minDate) ||
          getYearMonth(current) > getYearMonth(maxDate)
        );

      default:
        return Math.abs(current.diff(from, 'days')) >= 7;
    }
  }

  return false;
};

const FormDatePicker: React.FC = () => (
  <Space direction="vertical" style={{
    width: '90%',
    height: '40px',
    border: 'none',
    outline: 'none',
    backgroundColor: '#f3f4f6', 
    borderRadius: '0.375rem', 
    fontSize: '1.25rem',
  }}>
    <RangePicker disabledDate={disabled7DaysDate} 
        style={{
            width: '100%',
            height: '40px'
        }}
    />
  </Space>
);

export default FormDatePicker;