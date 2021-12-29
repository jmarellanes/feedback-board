import FeedbackItem from './FeedbackItem';
import Loader from './Loader';

function FeedbackList({ feedbackList, loading }) {
  const noFeedback = (
    <>
      <h2>There is not Feedback</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed?</p>
      <p>We love hearing about new ideas to improve our app.</p>
    </>
  );

  const isFeedback = feedbackList.map((feedback) => (
    <FeedbackItem
      title={feedback.fields.Title}
      description={feedback.fields.Description}
      upvotes={feedback.fields.Upvotes}
      category={feedback.fields.Category}
      comments={feedback.fields.TotalComments}
      key={feedback.fields.FeedbackId}
      id={feedback.fields.FeedbackId}
      link
      categoryActive
    />
  ));

  if (loading) return <Loader />;

  return (
    <section
      className='home-page__feedback-list'
      aria-labelledby='section-feedback-list'
    >
      <h2 id='section-feedback-list' hidden>
        Feedback List
      </h2>
      {!feedbackList.length ? noFeedback : isFeedback}
    </section>
  );
}

export default FeedbackList;
