import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import { usePrevious } from '../hooks/usePrevious';

import { ReactComponent as ChevronUp } from '../assets/images/chevron-up.svg';
import { operationStatus } from '../utils/data';

function Upvote({
  children,
  upvotedBy,
  id,
  updateUpvotesParentState,
  feedbackStatusIndex,
}) {
  const [user] = useUser();
  const upvoted = upvotedBy.includes(user.userID) || false;

  const upvoteButtonRef = useRef();
  const isUpvotingRef = useRef(false);

  const [userUpvotesList, setUserUpvotesList] = useState([]);
  const [isUpvoted, setIsUpvoted] = useState(upvoted);
  const [statusMessage, setStatusMessage] = useState('');
  const prevUpvotedBy = usePrevious(upvotedBy);

  const { upvoteAdd, upvoteRemove } = operationStatus;

  const updateUpvotesDB = async (arr) => {
    updateUpvotesParentState(arr, id, feedbackStatusIndex);

    try {
      const res = await fetch('/api/updateUpvotes', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          UpvotedBy: arr,
        }),
      });

      // Fix this!
      upvoteButtonRef.current.removeAttribute('data-operation-running');
      isUpvotingRef.current = false;

      if (res.status !== 200) {
        setStatusMessage(isUpvoted ? upvoteAdd.failure : upvoteRemove.failure);
        alert("We're having problems, please try again!'");
        updateUpvotesParentState(prevUpvotedBy, id);

        return setIsUpvoted(!isUpvoted);
      } else {
        setStatusMessage(
          isUpvoted ? upvoteAdd.complete : upvoteRemove.complete
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async () => {
    if (isUpvotingRef.current) return;
    isUpvotingRef.current = true;

    setIsUpvoted(!isUpvoted);
    upvoteButtonRef.current.setAttribute('data-operation-running', 'true');

    setStatusMessage(isUpvoted ? upvoteRemove.running : upvoteAdd.running);

    try {
      const res = await fetch(`/api/getUpvotes/?id=${id}`);
      const upvotesList = await res.json();
      const formattedUpvotes = upvotesList[0];

      setUserUpvotesList(formattedUpvotes || []);
    } catch (error) {
      console.log(error);
    }
  };

  const prevOpenRef = useRef(true);
  useEffect(() => {
    // Not run effect on initial render
    if (prevOpenRef.current) return (prevOpenRef.current = false);

    const addUpvote = userUpvotesList
      ? [user.userID, ...userUpvotesList]
      : [user.userID];

    const filteredUpvotes = userUpvotesList.filter(
      (upvotes) => upvotes !== user.userID
    );

    if (isUpvoted) {
      return updateUpvotesDB(addUpvote);
    }
    return updateUpvotesDB(filteredUpvotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userUpvotesList]);

  return (
    <button
      className={`upvotes ${isUpvoted ? 'upvotes--isUpvoted' : ''}`}
      ref={upvoteButtonRef}
      onClick={handleClick}
      onBlur={() => setStatusMessage('')}
    >
      <span className='upvotes__icon'>
        <ChevronUp />
      </span>
      <span className='upvotes__title'>
        <span className='upvotes__quantity'>
          {`${children}`}
          <span className='visually-hidden'>Upvotes</span>
        </span>
      </span>
      <span className='upvotes__loader'></span>
      <span
        className='visually-hidden operation__status-message'
        aria-live='assertive'
      >
        {statusMessage}
      </span>
    </button>
  );
}

export default Upvote;
