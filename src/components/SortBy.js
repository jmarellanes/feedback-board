import React, { useState } from 'react';
import Select, { components } from 'react-select';
import { ReactComponent as Arrow } from '../assets/images/arrow-up.svg';

const options = [
  {
    label: 'Most Upvotes',
    value: 'Most Upvotes',
  },
  {
    label: 'Least Upvotes',
    value: 'Least Upvotes',
  },
  {
    label: 'Most Comments',
    value: 'Most Comments',
  },
  {
    label: 'Least Comments',
    value: 'Least Comments',
  },
];

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Arrow label='Arrow' />
    </components.DropdownIndicator>
  );
};

function SortBy() {
  const [sortedBy, isSortedBy] = useState('Most Upvotes');

  return (
    <div className='sortby'>
      <label htmlFor='sortby' className='sortby__label'>
        Sort By:
      </label>
      <Select
        defaultValue={{
          label: 'Most Upvotes',
          value: 'Most Upvotes',
        }}
        placeholder={sortedBy}
        options={options}
        onChange={(value) => isSortedBy(value.label)}
        classNamePrefix='sortby'
        className='sortby__container'
        name='sortby'
        inputId='sortby'
        openMenuOnFocus
        components={{ DropdownIndicator }}
      />
    </div>
  );
}

export default SortBy;
