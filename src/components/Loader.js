import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Loader() {
  const [content, setContent] = useState(false);

  const noFeedback = (
    <>
      <h2>We're having a problem. There is no Feedback with this ID</h2>
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
        {noFeedback}
      </div>
    </div>
  );
}

export default Loader;
