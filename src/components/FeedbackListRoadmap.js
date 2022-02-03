import NoFeedback from '../components/NoFeedback';

function FeedbackListRoadmap({ children, status, desc, length, activeTab }) {
  const statusFeedback = status.toLowerCase();

  return (
    <section
      className={`roadmap-page__feedback-${statusFeedback} tabs__panel ${
        activeTab === `tab-label-${statusFeedback}` ? 'is-active' : ''
      }`}
      id={`tab-panel-${statusFeedback}`}
      aria-labelledby={`tab-label-${statusFeedback}`}
      role={'tabpanel'}
      tabIndex='-1'
    >
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
