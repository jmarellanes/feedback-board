import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import queryComponent from 'query-string';
import Select, { components } from 'react-select';

import { ReactComponent as Arrow } from '../assets/images/arrow-up.svg';
import { sortByOptions } from '../utils/data';

// Use Custom SVG for dropdown arrow
const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <Arrow label='Arrow' />
    </components.DropdownIndicator>
  );
};

function SortBy({ feedback, setFeedback }, ref) {
  const [sortByValue, setSortByValue] = useState({ label: '', value: '' });

  const { search } = useLocation();
  const history = useHistory();

  const queryString =
    queryComponent.parse(search).sortby === undefined
      ? 'most-upvotes'
      : queryComponent.parse(search).sortby;

  // Update "Sort by" dropdown label from url parameter when using the dropdown
  const updateSortLabelOnLoad = (type) => {
    switch (type) {
      case 'least-upvotes':
        return setSortByValue({ label: 'Least Upvotes', value: type });
      case 'most-comments':
        return setSortByValue({ label: 'Most Comments', value: type });
      case 'least-comments':
        return setSortByValue({ label: 'Least Comments', value: type });
      default:
        return setSortByValue({ label: 'Most Upvotes', value: 'most-upvotes' });
    }
  };

  // Update "Sort By" dropdown label.
  // This fn is called from homepage when category is changed.
  useImperativeHandle(ref, () => ({
    updateSort: () => {
      updateSortLabelOnLoad(queryString);
    },
  }));

  const pushURLParameter = (query) => {
    history.push(`?sortby=${query}`);
  };

  const sortFeedbackWithDropdown = (type, data) => {
    const sortedFeedback = [...data].sort((a, b) => {
      if (type === sortByValue.label) return null;
      switch (type) {
        case 'Least Upvotes':
          return a.fields.TotalUpvotes - b.fields.TotalUpvotes;
        case 'Most Comments':
          return b.fields.TotalComments - a.fields.TotalComments;
        case 'Least Comments':
          return a.fields.TotalComments - b.fields.TotalComments;
        default:
          return b.fields.TotalUpvotes - a.fields.TotalUpvotes;
      }
    });

    setFeedback(sortedFeedback);
  };

  const handleChange = (data) => {
    setSortByValue({ label: data.label, value: data.value });
    pushURLParameter(data.value);
    sortFeedbackWithDropdown(data.label, feedback);
  };

  useEffect(() => {
    updateSortLabelOnLoad(queryString);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='sortby'>
      <label htmlFor='sortby' className='sortby__label'>
        Sort By:
      </label>
      <Select
        value={{
          label: sortByValue.label,
          value: sortByValue.value,
        }}
        placeholder={sortByValue.label}
        options={sortByOptions}
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

export default forwardRef(SortBy);
