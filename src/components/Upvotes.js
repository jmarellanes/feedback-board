import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';

import { ReactComponent as ChevronUp } from '../assets/images/chevron-up.svg';

/*
 TODO:
  * > Button animation
  * > Get update data from database before add or remove upvotes to avoid rewrites. 
  * > Refactor with Context?? 
*/

function Upvote({ children, upvotedBy, id, updateUpvotesParentState }) {
  const [user] = useUser();
  const upvoted = upvotedBy ? upvotedBy.includes(user.userID) : false;

  const upvoteButtonRef = useRef();
  const isUpvotingRef = useRef(false);

  const [userUpvotesList, setUserUpvotesList] = useState([]);
  const [isUpvoted, setIsUpvoted] = useState(upvoted);

  const getUpvotes = async () => {
    try {
      const res = await fetch(`/api/getUpvotes/?id=${id}`);
      const upvotesList = await res.json();
      const formattedUpvotes = upvotesList[0];

      setUserUpvotesList(formattedUpvotes);
    } catch (error) {
      console.log(error);
    }
  };

  const updateUpvotesDB = async (arr) => {
    try {
      const res = await fetch('/api/updateUpvotes', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          UpvotedBy: arr,
        }),
      });

      if (res.status === 200) {
        console.log('orking');

        upvoteButtonRef.current.removeAttribute('data-operation-running');
        return (isUpvotingRef.current = false);
      } else {
        console.log('Not Working');
        upvoteButtonRef.current.removeAttribute('data-operation-running');
        isUpvotingRef.current = false;
        return setIsUpvoted(!isUpvoted);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = () => {
    if (isUpvotingRef.current) return;
    isUpvotingRef.current = true;

    setIsUpvoted(!isUpvoted);

    upvoteButtonRef.current.setAttribute('data-operation-running', 'true');
    getUpvotes();
  };

  const toggleUpvote = (add, remove) => {
    if (!isUpvoted) {
      updateUpvotesDB(remove);
      updateUpvotesParentState(remove, id);
      return;
    }

    updateUpvotesDB(add);
    updateUpvotesParentState(add, id);
    return;
  };

  const prevOpenRef = useRef(true);
  useEffect(() => {
    // Not run effect on initial render
    if (prevOpenRef.current) return (prevOpenRef.current = false);

    const addUpvote = userUpvotesList
      ? [user.userID, ...userUpvotesList]
      : [user.userID];
    const filteredUpvotes = upvotedBy.filter(
      (upvotes) => upvotes !== user.userID
    );

    toggleUpvote(addUpvote, filteredUpvotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUpvotesList]);

  return (
    <button
      className={`upvotes ${isUpvoted ? 'upvotes--isUpvoted' : ''}`}
      ref={upvoteButtonRef}
      onClick={handleClick}
    >
      <ChevronUp />
      <span className='upvotes__title'>
        <span className='upvotes__quantity'>{children}</span>
      </span>
      <span className='upvotes__loader'></span>
    </button>
  );
}

export default Upvote;
