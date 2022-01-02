import { useState } from 'react';
import { useUser } from '../context/UserContext';

import { ReactComponent as ChevronUp } from '../assets/images/chevron-up.svg';

/*
 TODO:
  * > Button animation
  * > Get update data from database before add or remove upvotes to avoid rewrites. 
  * > Refactor with Context?? 
*/

function Upvote({ children, upvotedBy, id, updateUpvotesState }) {
  const [user] = useUser();
  const upvoted = upvotedBy ? upvotedBy.includes(user.userID) : false;

  const [isUpvoted, setIsUpvoted] = useState(upvoted);
  const [totalUpvotes, setTotalUpvotes] = useState(children);

  const updateUpvote = async (arr) => {
    try {
      await fetch('/api/updateUpvotes', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          UpvotedBy: arr,
        }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  function handleClick() {
    const addUpvote = upvotedBy ? [user.userID, ...upvotedBy] : [user.userID];
    const filteredUpvotes = upvotedBy.filter(
      (upvotes) => upvotes !== user.userID
    );

    if (isUpvoted) {
      setTotalUpvotes((prevUpvotes) => prevUpvotes - 1);
      updateUpvote(filteredUpvotes);
      updateUpvotesState(filteredUpvotes, id);

      return setIsUpvoted(!isUpvoted);
    }

    setTotalUpvotes((prevUpvotes) => prevUpvotes + 1);
    updateUpvote(addUpvote);
    updateUpvotesState(addUpvote, id);

    return setIsUpvoted(!isUpvoted);
  }

  return (
    <button
      className={`upvotes ${isUpvoted ? 'upvotes--active' : ''}`}
      onClick={handleClick}
    >
      <ChevronUp />
      <span className='upvotes__quantity'>{totalUpvotes}</span>
    </button>
  );
}

export default Upvote;
