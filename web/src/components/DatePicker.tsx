import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styled from 'styled-components';
import { BiSolidCalendar } from 'react-icons/bi';

const DateInputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 2px;
  padding-right: 15px;
  width: 100%;
  height: 46px;
  color: #686868;
  display: flex;
  justify-content: space-between;

  .react-datepicker__day--selected {
    background-color: #023E8A !important;
  }
`;

const DateInputIcon = styled(BiSolidCalendar)`
`;

const DateInputStyled = styled(DatePicker)`
  flex: 1;
  border: none;
  outline: none;
  font-size: 16px;
  padding: 0 8px;
`;

interface DateInputProps {
    selectedDate: Date;
    onChange: (date: Date) => void;
  }
  
  export const DateInput: React.FC<DateInputProps> = ({ selectedDate, onChange }) => {
    return (
      <DateInputContainer>
        <DateInputStyled
          selected={selectedDate}
          onChange={onChange}
          dateFormat="dd/MM/yyyy"
        />
        <DateInputIcon />
      </DateInputContainer>
    );
  };
  