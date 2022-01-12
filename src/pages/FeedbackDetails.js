import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import FeedbackItem from '../components/FeedbackItem';
import FeedbackComments from '../components/FeedbackComments';
import CreateComment from '../components/CreateComment';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import EditFeedback from '../components/EditFeedback';
import Upvotes from '../components/Upvotes';

function FeedbackDetails() {
  const [feedback, setFeedback] = useState({});
  const [allComments, setComments] = useState([]);
  const [topLevelComments, setTopLevel] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  const updateUpvotesParentState = (arr, id) => {
    const updateFeedback = {
      ...feedback,
      UpvotedBy: arr,
      TotalUpvotes: arr.length,
    };

    setFeedback(updateFeedback);
  };

  const loadFeedbackDetails = async () => {
    try {
      const res = await fetch(`/api/getFeedbackDetails?id=${id}`);
      const feedbackList = await res.json();
      const [rawData] = feedbackList;
      const formattedFeedback = rawData.fields;

      setFeedback(formattedFeedback);
    } catch (error) {
      console.log(error);
    }

    if (showModal) setShowModal(false);
  };

  // const {
  //   fields: { Title: title, Status: status },
  // } = feedback[0];

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

  const commentsTotal = () => {
    if (allComments.length === 0) {
      return 'No Comments';
    } else if (allComments.length === 1) {
      return '1 Comment';
    } else {
      return allComments.length + ' Comments';
    }
  };

  const closeModal = (e) => {
    if (e.target.parentNode.hasAttribute('data-operation-running')) return;

    setShowModal(!showModal);
  };

  const openModal = (
    <Modal onClose={closeModal} isOpen='modal__is-open'>
      <EditFeedback
        feedbackUpdated={loadFeedbackDetails}
        onClick={closeModal}
        title={feedback.Title}
        comment={feedback.Description}
        category={feedback.Category}
        status={feedback.Status}
        id={feedback.FeedbackId}
      />
    </Modal>
  );

  return (
    <>
      <div id='feedback-page__wrapper'>
        {!Object.keys(feedback).length ? (
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
                <Button
                  typeAttribute='button'
                  buttonStyle='button--secondary'
                  onClick={() => setShowModal(!showModal)}
                >
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
                  title={feedback.Title}
                  description={feedback.Description}
                  category={feedback.Category}
                  comments={allComments.length}
                  link={false}
                  categoryActive={false}
                >
                  <Upvotes
                    upvotedBy={feedback.UpvotedBy ? feedback.UpvotedBy : []}
                    id={feedback.FeedbackId}
                    updateUpvotesParentState={updateUpvotesParentState}
                  >
                    {feedback.TotalUpvotes}
                  </Upvotes>
                </FeedbackItem>
              </section>

              <section
                className='feedback-comments'
                aria-labelledby='section-feedback-comments'
              >
                <div className='feedback-comments__container'>
                  <h2 id='section-feedback-comments' hidden>
                    Feedback Comments
                  </h2>
                  <p className='h3'>{commentsTotal()}</p>
                  {topLevelComments.map((rawComment) => {
                    const comment = rawComment.fields;

                    return (
                      <FeedbackComments
                        allComments={allComments}
                        key={comment.CommentId}
                        name={comment.Name}
                        username={comment.Username}
                        image={comment.Image}
                        comment={comment.Comment}
                        commentId={comment.CommentId}
                        feedbackId={feedback.FeedbackId}
                        commentAdded={loadComments}
                      />
                    );
                  })}
                </div>
              </section>

              <section
                className='create-comment'
                aria-labelledby='section-create-comment'
              >
                <h2
                  id='section-create-comment'
                  className='create-comment__title'
                >
                  Add Comment
                </h2>
                <CreateComment
                  feedbackId={feedback.FeedbackId}
                  commentAdded={loadComments}
                >
                  Post Comment
                </CreateComment>
              </section>
            </main>
          </>
        )}
      </div>

      {/* Add Feedback Modal*/}
      <CSSTransition
        in={showModal}
        classNames='modal-transition'
        unmountOnExit
        timeout={250}
      >
        {openModal}
      </CSSTransition>
    </>
  );
}

export default FeedbackDetails;
