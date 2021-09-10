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

const sortByStyles = {
  control: (styles) => {
    return [
      // console.log({ control: styles }),
      {
        ...styles,
        backgroundColor: 'var(--color__tertiary)',
        border: 'none',
      },
    ];
  },
  menu: (styles) => {
    return [
      // console.log({ menu: styles }),
      {
        ...styles,
        backgroundColor: 'white',
        borderRadius: '.75rem',
        boxShadow: '0px 10px 40px -5px rgba(55, 63, 104, 0.3)',
      },
    ];
  },
  placeholder: (styles) => ({
    ...styles,
    color: 'var(--color__light)',
  }),
  groupHeading: (styles) => {
    return [console.log(styles), ''];
  },
};

function SortBy() {
  const [sortedBy, isSortedBy] = useState('Most Upvotes');

  return (
    <div className='sortby'>
      <label htmlFor='sortby'>Sort By</label>
      <div className='sortby__container'>
        <Select
          placeholder={sortedBy}
          label='Sort By'
          options={options}
          onChange={(value) => isSortedBy(value.label)}
          styles={sortByStyles}
          name='sortby'
          inputId='sortby'
          openMenuOnFocus
        />
      </div>
    </div>
  );
}

export default SortBy;
