import { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import FeedbackItem from '../components/FeedbackItem';
import FeedbackComments from '../components/FeedbackComments';

function FeedbackDetails() {
  const [feedback, setFeedback] = useState([]);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
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
      setComments(commentsList.comments);
      setReplies(commentsList.replies);
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
              link={false}
            />
          </section>
          <section>
            <h3>
              {feedback[0].fields.Comments
                ? `${feedback[0].fields.Comments.length} Comments`
                : `0 Comments`}
            </h3>
            {comments.map((comment) => (
              <FeedbackComments
                key={comment.fields.CommentId}
                image={comment.fields.Image}
                name={comment.fields.Name}
                username={comment.fields.Username}
                comment={comment.fields.Comment}
                commentId={comment.fields.CommentId}
                parentId={
                  comment.fields.ParentId ? comment.fields.ParentId : null
                }
                replies={replies}
              />
            ))}
          </section>
        </>
      )}
    </>
  );
}

export default FeedbackDetails;
