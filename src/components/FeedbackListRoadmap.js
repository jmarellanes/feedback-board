import NoFeedback from '../components/NoFeedback';

function FeedbackListRoadmap({ children, status, desc, length }) {
  status = status.toLowerCase();

  return (
    <section className={`roadmap-page__feedback-${status}`}>
      <header className='roadmap-page__feedback-header'>
        <h3>
          {status} ({length})
        </h3>
        <p>{desc}</p>
      </header>

      {length >= 1 ? children : <NoFeedback />}
    </section>
  );
}

export default FeedbackListRoadmap;
