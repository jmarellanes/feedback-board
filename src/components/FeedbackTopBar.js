function FeedbackTopBar({ children }) {
  return (
    <section
      className='home-page__feedback-topbar'
      aria-labelledby='section-feedback-topbar'
    >
      <h2 id='section-feedback-topbar' hidden>
        Feedback Top Bar
      </h2>
      <div className='feedback-topbar'>{children}</div>
    </section>
  );
}

export default FeedbackTopBar;
