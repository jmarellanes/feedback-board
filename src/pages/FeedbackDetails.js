import { useState, useEffect, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import { useUser } from '../context/UserContext';
import FeedbackItem from '../components/FeedbackItem';
import FeedbackComments from '../components/FeedbackComments';
import CreateComment from '../components/CreateComment';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import EditFeedback from '../components/EditFeedback';

function FeedbackDetails() {
  const [feedback, setFeedback] = useState({});
  const [allComments, setComments] = useState([]);
  const [topLevelComments, setTopLevel] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const [user] = useUser();
  const { UserID: feedbackAuthor } = feedback;

  const { id } = useParams();
  const history = useHistory();
  const isMounted = useRef(true);

  const loadFeedbackDetails = async () => {
    try {
      const res = await fetch(`/api/getFeedbackDetails?id=${id}`);
      const [feedbackList] = await res.json();

      if (isMounted.current) setFeedback(feedbackList);
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

      if (isMounted.current) setComments(commentsList.allComments);
      if (isMounted.current) setTopLevel(commentsList.topLevelComments);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeedbackDetails();
    loadComments();

    return () => {
      isMounted.current = false;
    };
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
    if (
      e.target?.parentNode.hasAttribute('data-operation-running') ||
      e.parentNode?.hasAttribute('data-operation-running')
    )
      return;

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
        feedbackComments={allComments}
      />
    </Modal>
  );

  return (
    <>
      <div id='feedback-page__wrapper'>
        {Object.keys(feedback).length === 0 ? (
          <Loader type='feedback-details' />
        ) : (
          <>
            <header className='header-secondary'>
              <div className='header-secondary__container'>
                <Button
                  typeAttribute='button'
                  buttonStyle='button--back-light'
                  svgIcon='chevron-left'
                  onClick={() => history.goBack()}
                >
                  Go Back
                </Button>
                {String(feedbackAuthor) === user.userID ? (
                  <Button
                    typeAttribute='button'
                    buttonStyle='button--secondary'
                    onClick={() => setShowModal(!showModal)}
                  >
                    Edit Feedback
                  </Button>
                ) : null}
              </div>
            </header>

            <main className='feedback-page__content'>
              <h1 className='visually-hidden'>Details for {feedback.Title}</h1>
              <section
                className='feedback-detail'
                aria-labelledby='section-feedback-detail'
              >
                <h2 id='section-feedback-detail' className='visually-hidden'>
                  Feedback Detail
                </h2>
                <FeedbackItem
                  title={feedback.Title}
                  description={feedback.Description}
                  category={feedback.Category}
                  comments={allComments.length}
                  id={feedback.FeedbackId}
                  upvotedBy={feedback.UpvotedBy ? feedback.UpvotedBy : []}
                  totalUpvotes={feedback.TotalUpvotes}
                  link={false}
                  categoryActive={false}
                />
              </section>

              <section
                className='feedback-comments'
                aria-labelledby='section-feedback-comments'
              >
                <div className='feedback-comments__container'>
                  <h2
                    id='section-feedback-comments'
                    className='visually-hidden'
                  >
                    Feedback Comments
                  </h2>
                  <p className='h3'>{commentsTotal()}</p>
                  {topLevelComments.map((data) => {
                    const comment = data.fields;

                    return (
                      <FeedbackComments
                        allComments={allComments}
                        key={comment.CommentID}
                        name={comment.Name}
                        username={comment.Username}
                        image={comment.Image}
                        comment={comment.Comment}
                        commentID={comment.CommentID}
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
