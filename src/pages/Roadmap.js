import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import FeedbackItem from '../components/FeedbackItem';
import Modal from '../components/Modal';
import CreateFeedback from '../components/CreateFeedback';
import Upvotes from '../components/Upvotes';
import FeedbackListRoadmap from '../components/FeedbackListRoadmap';
import Loader from '../components/Loader';
import Button from '../components/Button';

function Roadmap() {
  const [feedback, setFeedback] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  const history = useHistory();

  const updateUpvotesParentState = (arr, id, index) => {
    let updateState = feedback[index].map((item) => {
      if (item.fields.FeedbackId === id) {
        return {
          fields: { ...item.fields, UpvotedBy: arr, TotalUpvotes: arr.length },
        };
      }
      return item;
    });

    const updateFeedback = [...feedback];
    updateFeedback[index] = updateState;
    setFeedback(updateFeedback);
  };

  const feedbackItem = (feedbackData, index) =>
    feedbackData.map((data) => {
      const fb = data.fields;

      return (
        <FeedbackItem
          title={fb.Title}
          description={fb.Description}
          category={fb.Category}
          comments={fb.TotalComments}
          key={fb.FeedbackId}
          id={fb.FeedbackId}
          status={fb.Status}
          link
          categoryActive
          roadmapFeedback
        >
          <Upvotes
            upvotedBy={fb.UpvotedBy ? fb.UpvotedBy : []}
            id={fb.FeedbackId}
            updateUpvotesParentState={updateUpvotesParentState}
            feedbackStatusIndex={index}
          >
            {fb.TotalUpvotes}
          </Upvotes>
        </FeedbackItem>
      );
    });

  const feedbackList = feedback.map((data, index) => {
    const info = [
      { status: 'Planned', description: 'Ideas prioritized for research' },
      { status: 'In-Progress', description: 'Currently being developed' },
      { status: 'Live', description: 'Released features' },
    ];

    return (
      <FeedbackListRoadmap
        status={info[index]['status']}
        desc={info[index]['description']}
        length={data.length}
        key={info[index]['status']}
      >
        {feedbackItem(data, index)}
      </FeedbackListRoadmap>
    );
  });

  const closeModal = (e) => {
    if (e.target.parentNode.hasAttribute('data-operation-running')) return;

    setShowModal(!showModal);
  };

  const feedbackAdded = () => {
    setShowModal(!showModal);

    setTimeout(() => {
      history.push('/');
    }, 100);
  };

  const openModal = (
    <Modal onClose={closeModal} isOpen='modal__is-open'>
      <CreateFeedback feedbackAdded={feedbackAdded} onClick={closeModal} />
    </Modal>
  );

  const loadFeedback = async (abortCont) => {
    try {
      const res = await fetch(`/api/getStatus`, { signal: abortCont.signal });
      const statusRes = await res.json();

      setFeedback(() => [
        statusRes.planned,
        statusRes.inProgress,
        statusRes.live,
      ]);
    } catch (error) {
      console.log(error);
    }

    if (!abortCont.signal.aborted) setLoading(false);
  };

  useEffect(() => {
    const abortCont = new AbortController();

    loadFeedback(abortCont);

    return () => {
      abortCont.abort();
    };
  }, []);

  return (
    <>
      <div id='roadmap-page__wrapper'>
        <header className='header-tertiary'>
          <div className='header-tertiary__container'>
            <Button
              typeAttribute='button'
              buttonStyle='button--back-dark'
              svgIcon='chevron-left'
              onClick={() => history.goBack()}
            >
              Go Back
            </Button>
            <Button
              typeAttribute='button'
              buttonStyle='button--primary'
              svgIcon='sign'
              onClick={() => setShowModal(!showModal)}
            >
              Add Feedback
            </Button>
          </div>
          <span>Placeholder for Top Bar</span>
        </header>
        <main className='roadmap-page roadmap-page__content'>
          {loading ? <Loader type='feedback-roadmap' /> : feedbackList}
        </main>
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

export default Roadmap;
