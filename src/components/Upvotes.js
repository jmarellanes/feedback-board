import { useState, useRef, useEffect } from 'react';
import { useUser } from '../context/UserContext';

import { ReactComponent as ChevronUp } from '../assets/images/chevron-up.svg';
import { operationStatus } from '../utils/data';

function Upvotes({ upvotedBy, id, totalUpvotesFromParent }) {
  const [user] = useUser();
  const upvoted = upvotedBy.includes(user.userID) || false;

  const isUpvotingRef = useRef(false);

  const [userUpvotesList, setUserUpvotesList] = useState([]);
  const [totalUpvotes, setTotalUpvotes] = useState(null);
  const [isUpvoted, setIsUpvoted] = useState(upvoted);
  const [statusMessage, setStatusMessage] = useState('');
  const [operationRunning, setOperationRunning] = useState(false);

  const [runGetEffect, setRunGetEffect] = useState(false);
  const [runUpdateEffect, setRunUpdateEffect] = useState(false);

  const { upvoteAdd, upvoteRemove } = operationStatus;

  const handleClick = () => {
    if (isUpvotingRef.current) return;
    isUpvotingRef.current = true;

    setStatusMessage(isUpvoted ? upvoteRemove.running : upvoteAdd.running);
    setIsUpvoted(!isUpvoted);
    setOperationRunning(!operationRunning);

    setRunGetEffect(true);
  };

  const getUpdatedUpvotes = async () => {
    if (!runGetEffect) return;

    try {
      const res = await fetch(`/api/getUpvotes/?id=${id}`);
      const upvotesList = await res.json();
      const formattedUpvotes = upvotesList[0];

      setUserUpvotesList(formattedUpvotes || []);
    } catch (error) {
      console.log(error);
    }

    setRunUpdateEffect(true);
  };

  const updateUpvotesDB = async (arr) => {
    if (!runUpdateEffect) return;

    setTotalUpvotes(arr.length);

    try {
      const res = await fetch('/api/updateUpvotes', {
        method: 'PUT',
        body: JSON.stringify({
          id,
          UpvotedBy: arr,
        }),
      });

      setOperationRunning(!operationRunning);
      setRunGetEffect(false);
      setRunUpdateEffect(false);
      isUpvotingRef.current = false;

      if (res.status !== 200) {
        setStatusMessage(isUpvoted ? upvoteAdd.failure : upvoteRemove.failure);
        alert("We're having problems, please try again!'");
        setTotalUpvotes(null);

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

  const prevOpenRef = useRef(true);
  useEffect(() => {
    // Not run effect on initial render
    if (prevOpenRef.current) return (prevOpenRef.current = false);

    getUpdatedUpvotes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runGetEffect]);

  useEffect(() => {
    if (!runUpdateEffect) return;

    if (isUpvoted) {
      const addUpvote = userUpvotesList
        ? [user.userID, ...userUpvotesList]
        : [user.userID];

      return updateUpvotesDB(addUpvote);
    }

    const filteredUpvotes = userUpvotesList.filter(
      (upvotes) => upvotes !== user.userID
    );
    return updateUpvotesDB(filteredUpvotes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [runUpdateEffect]);

  return (
    <button
      className={`upvotes ${isUpvoted ? 'upvotes--isUpvoted' : ''}`}
      onClick={handleClick}
      onBlur={() => setStatusMessage('')}
      data-operation-running={operationRunning}
      type='button'
    >
      <span className='upvotes__icon'>
        <ChevronUp />
      </span>
      <span className='upvotes__title'>
        <span className='upvotes__quantity'>
          {totalUpvotes === null ? totalUpvotesFromParent : totalUpvotes}
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

export default Upvotes;
