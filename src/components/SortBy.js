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

function SortBy({ value, onChange }) {
  const handleChange = (value) => {
    onChange(value.label);
  };

  return (
    <div className='sortby'>
      <label htmlFor='sortby' className='sortby__label'>
        Sort By:
      </label>
      <Select
        value={{
          label: value,
          value: value,
        }}
        placeholder={value}
        options={options}
        onChange={handleChange}
        classNamePrefix='sortby'
        className='sortby__container'
        name='sortby'
        inputId='sortby'
        components={{ DropdownIndicator }}
      />
    </div>
  );
}

export default SortBy;
