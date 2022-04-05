import NoFeedback from './NoFeedback';
import Loader from './Loader';

function FeedbackList({ loading, children }) {
  if (loading) return <Loader type='feedback-home' />;

  return (
    <section
      className='home-page__feedback-list'
      aria-labelledby='section-feedback-list'
    >
      <h2 id='section-feedback-list' className='visually-hidden'>
        Feedback List
      </h2>
      {children.length >= 1 ? children : <NoFeedback />}
    </section>
  );
}

export default FeedbackList;
