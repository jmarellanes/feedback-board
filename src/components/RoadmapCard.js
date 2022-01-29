import React from 'react';
import Anchor from './Anchor';

function RoadmapCard({ statusList }) {
  return (
    <aside className='header-main__roadmap-card roadmap-card'>
      <div className='roadmap-card__title'>
        <h3>Roadmap</h3>
        <Anchor path='roadmap' anchorStyle='anchor--back-light' svgIcon={false}>
          View
        </Anchor>
      </div>
      <table className='roadmap-card__element'>
        <caption className='visually-hidden'>List of feedback status</caption>
        <thead>
          <tr>
            <th aria-labelledby='table-status'>
              <span id='table-status' hidden>
                Status
              </span>
            </th>
            <th aria-labelledby='table-quantity'>
              <span id='table-quantity' hidden>
                Quantity
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {statusList.map((status) => (
            <tr className='roadmap-card__item' key={status[0]}>
              <td
                className={`roadmap-card__name roadmap-card__name--${status[0]}`}
              >
                {status[0]}
              </td>
              <td className='roadmap-card__quantity'>{status[1]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </aside>
  );
}

export default RoadmapCard;
