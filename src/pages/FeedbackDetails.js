import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import FeedbackItem from '../components/FeedbackItem';
import FeedbackComments from '../components/FeedbackComments';

function FeedbackDetails() {
  const [feedback, setFeedback] = useState([]);
  const [comments, setComments] = useState([]);
  const { id } = useParams();

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
      setComments(commentsList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeedbackDetails();
    loadComments();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {!feedback.length ? (
        'Loading'
      ) : (
        <>
          <section>
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
            />
          </section>
          <section>
            <h3>{`${feedback[0].fields.Comments.length} Comments`}</h3>
            {comments.map((comment) => (
              <FeedbackComments
                key={comment.fields.CommentID}
                image={comment.fields.Image}
                name={comment.fields.Name}
                username={comment.fields.Username}
                comment={comment.fields.Comment}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
}

export default FeedbackDetails;
