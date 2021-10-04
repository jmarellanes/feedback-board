import React from 'react';

export default function HeaderBrandmark({ title }) {
  return (
    <div className='header-main__brandmark'>
      <h2 className='header-main__title'>{title}</h2>
      <div className='header-main__user'>
        <i>Todo: User Data</i>
      </div>
    </div>
  );
}
