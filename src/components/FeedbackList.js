// import { useRef } from 'react';
// import { gsap } from 'gsap';
import FeedbackItem from './FeedbackItem';
import Loader from './Loader';

function FeedbackList({ feedbackList, loading }) {
  // const feedbackRef = useRef();
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
        id={feedback.fields.FeedbackId}
        link={true}
      />
    ));

  // useEffect(() => {
  //   gsap.to(feedbackRef.current, { opacity: 1 });
  // });

  if (loading) return <Loader />;

  return (
    <section
      className='home-page__feedback-list'
      aria-labelledby='section-feedback-list'
      // ref={feedbackRef}
    >
      <h2 id='section-feedback-list' hidden>
        Feedback List
      </h2>
      {!feedbackList.length ? noFeedback() : isFeedback()}
    </section>
  );
}

export default FeedbackList;
