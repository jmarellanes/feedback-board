import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Loader({ type }) {
  const [content, setContent] = useState(false);

  const noFeedbackDetails = (
    <>
      <h2>Hmm... We're having a problem. There is no Feedback with this ID</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed?</p>
      <p>We love hearing about new ideas to improve our app.</p>

      <div className='loader__redirect'>
        <p>
          Go to&nbsp;
          <Link to='/' className='h1'>
            FeedbackTo
          </Link>
          &nbsp;home
        </p>
      </div>
    </>
  );

  const noFeedbackHome = (
    <>
      <h2>Hmm.. We're having a problem.</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed?</p>
      <p>We love hearing about new ideas to improve our app.</p>

      <div className='loader__redirect'>
        <h3>Please refresh your browser</h3>
      </div>
    </>
  );

  const message = (type) => {
    switch (type) {
      case 'feedback-details':
        return noFeedbackDetails;
      case 'feedback-home':
        return noFeedbackHome;
      default:
        return null;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setContent(true);
    }, 6000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='loader__container'>
      <div className='loader__title'>
        <span className='loader__dots'>Loading...</span>
      </div>
      <div
        className={`loader__content ${content ? 'loader__content--show' : ''}`}
      >
        {message(type)}
      </div>
    </div>
  );
}

export default Loader;
