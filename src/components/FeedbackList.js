import Loader from './Loader';

function FeedbackList({ loading, fadeOutFeedback, setLoading, children }) {
  if (loading) return <Loader type='feedback-home' />;

  return (
    <section
      className={`home-page__feedback-list ${fadeOutFeedback ? 'fading' : ''}`}
      aria-labelledby='section-feedback-list'
      onAnimationEnd={(e) => {
        if (e.animationName === 'fade-out') setLoading(true);
      }}
    >
      <h2 id='section-feedback-list' className='visually-hidden'>
        Feedback List
      </h2>
      {children}
    </section>
  );
}

export default FeedbackList;
