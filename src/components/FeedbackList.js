import FeedbackItem from './FeedbackItem';
import Loader from './Loader';

function FeedbackList({ feedbackList, loading }) {
  const noFeedback = () => (
    <>
      <h2>There is not Feedback</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed?</p>
      <p>We love hearing about new ideas to improve our app.</p>
    </>
  );

  const isFeedback = () =>
    feedbackList.map((feedback) => (
      <FeedbackItem
        title={feedback.fields.Title}
        description={feedback.fields.Description}
        upvotes={feedback.fields.Upvotes}
        category={feedback.fields.Category}
        comments={
          feedback.fields.Comments ? feedback.fields.Comments.length : 0
        }
        key={feedback.fields.FeedbackId}
      />
    ));

  if (loading) return <Loader />;

  return (
    <section className='feedback' aria-labelledby='section-feedback'>
      <h2 id='section-feedback' hidden>
        Feedback List
      </h2>
      <div className='feedback__container'>
        {!feedbackList.length ? noFeedback() : isFeedback()}
      </div>
    </section>
  );
}

export default FeedbackList;
