import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import FeedbackItem from '../components/FeedbackItem';
import FeedbackComments from '../components/FeedbackComments';
import CreateComment from '../components/CreateComment';
import Button from '../components/Button';
import Loader from '../components/Loader';

function FeedbackDetails() {
  const [feedback, setFeedback] = useState([]);
  const [allComments, setComments] = useState([]);
  const [topLevelComments, setTopLevel] = useState([]);
  const { id } = useParams();
  const history = useHistory();

  const loadFeedbackDetails = async () => {
    try {
      const res = await fetch(`/api/getFeedbackDetails?id=${id}`);
      const feedbackList = await res.json();
      setFeedback(feedbackList);
    } catch (error) {
      console.log(error);
    }
  };

  const loadComments = async () => {
    try {
      const res = await fetch(`/api/getComments?id=${id}`);
      const commentsList = await res.json();
      setComments(commentsList.allComments);
      setTopLevel(commentsList.topLevelComments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeedbackDetails();
    loadComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id='feedback-page__wrapper'>
      {!feedback.length ? (
        <Loader />
      ) : (
        <>
          <header className='header-third'>
            <div className='header-third__container'>
              <Button
                typeAttribute='button'
                buttonStyle='button--back-light'
                svgIcon='chevron-left'
                onClick={() => history.goBack()}
              >
                Go Back
              </Button>
              <Button typeAttribute='button' buttonStyle='button--secondary'>
                Edit Feedback
              </Button>
            </div>
          </header>

          <main className='feedback-page__content'>
            <section
              className='feedback-detail'
              aria-labelledby='section-feedback-detail'
            >
              <h2 id='section-feedback-detail' hidden>
                Feedback Detail
              </h2>
              <FeedbackItem
                title={feedback[0].fields.Title}
                description={feedback[0].fields.Description}
                upvotes={feedback[0].fields.Upvotes}
                category={feedback[0].fields.Category}
                comments={
                  feedback[0].fields.Comments
                    ? feedback[0].fields.Comments.length
                    : 0
                }
                link={false}
              />
            </section>

            <section
              className='feedback-comments'
              aria-labelledby='section-feedback-comments'
            >
              <div className='feedback-comments__container'>
                <h2 id='section-feedback-comments' hidden>
                  Feedback Comments
                </h2>
                <p className='h3'>
                  {feedback[0].fields.Comments
                    ? `${feedback[0].fields.Comments.length} Comments`
                    : `No Comments`}
                </p>
                {topLevelComments.map((comment) => (
                  <FeedbackComments
                    allComments={allComments}
                    key={comment.fields.CommentId}
                    name={comment.fields.Name}
                    username={comment.fields.Username}
                    image={comment.fields.Image}
                    comment={comment.fields.Comment}
                    commentId={comment.fields.CommentId}
                    parentId={
                      comment.fields.ParentId ? comment.fields.ParentId : null
                    }
                    parentUsername={
                      comment.fields.ParentId ? comment.fields.Username : null
                    }
                  />
                ))}
              </div>
            </section>

            <section
              className='create-comment'
              aria-labelledby='section-create-comment'
            >
              <h2 id='section-create-comment' className='create-comment__title'>
                Add Comment
              </h2>
              <CreateComment>Post Comment</CreateComment>
            </section>
          </main>
        </>
      )}
    </div>
  );
}

export default FeedbackDetails;
