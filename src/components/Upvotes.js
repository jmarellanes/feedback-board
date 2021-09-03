import React, { useState } from 'react';
import { ReactComponent as ChevronUp } from '../assets/images/chevron-up.svg';

export default function Upvote() {
  const [upvotes, setUpvotes] = useState(14);
  const [isUpvoted, setIsUpvoted] = useState(false);

  function addUpvote() {
    if (isUpvoted) {
      setIsUpvoted(!isUpvoted);
      return setUpvotes(upvotes - 1);
    }

    setIsUpvoted(!isUpvoted);
    setUpvotes(upvotes + 1);
  }

  return (
    <button
      className={`upvotes ${isUpvoted ? 'upvotes--active' : ''}`}
      onClick={addUpvote}
    >
      <ChevronUp />
      <span className='upvotes__quantity'>{upvotes}</span>
    </button>
  );
}
