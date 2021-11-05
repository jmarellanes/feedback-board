import { useState } from 'react';
import { ReactComponent as ChevronUp } from '../assets/images/chevron-up.svg';

export default function Upvote() {
  const [upvotes, setUpvotes] = useState(14);
  const [isUpvoted, setIsUpvoted] = useState(false);

  function addUpvote() {
    if (isUpvoted) {
      setUpvotes((prevUpvotes) => prevUpvotes - 1);
      return setIsUpvoted(!isUpvoted);
    }

    setUpvotes((prevUpvotes) => prevUpvotes + 1);
    setIsUpvoted(!isUpvoted);
  }

  return (
    <button
      className={`upvotes feedback__upvotes ${
        isUpvoted ? 'upvotes--active' : ''
      }`}
      onClick={addUpvote}
    >
      <ChevronUp />
      <span className='upvotes__quantity'>{upvotes}</span>
    </button>
  );
}
