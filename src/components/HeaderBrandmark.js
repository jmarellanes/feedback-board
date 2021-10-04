import React from 'react';

export default function HeaderBrandmark({ title }) {
  return (
    <div className='header-main__brandmark'>
      <h1>{title}</h1>
      <p>
        <i>Todo: User Data</i>
      </p>
    </div>
  );
}
