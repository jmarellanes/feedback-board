import Loader from './Loader';

function FeedbackList({ loading, children }) {
  const noFeedback = (
    <>
      <h2>There is not Feedback</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed?</p>
      <p>We love hearing about new ideas to improve our app.</p>
    </>
  );

  if (loading) return <Loader type='feedback-home' />;

  return (
    <section
      className='home-page__feedback-list'
      aria-labelledby='section-feedback-list'
    >
      <h2 id='section-feedback-list' hidden>
        Feedback List
      </h2>
      {children.length >= 1 ? children : noFeedback}
    </section>
  );
}

export default FeedbackList;
