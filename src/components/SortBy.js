import React, { useState } from 'react';
import Select from 'react-select';

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
      />
    </div>
  );
}

export default SortBy;
