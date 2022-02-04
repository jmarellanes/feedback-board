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
  const [statusList, setStatusList] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tab-label-planned');
  const [prevTab, setPrevTab] = useState('');

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

  const FeedbackList = () =>
    feedback.map((data, index) => {
      return (
        <FeedbackListRoadmap
          status={statusList[index]['Status']}
          desc={statusList[index]['Descrition']}
          length={data.length}
          key={statusList[index]['Order']}
          activeTab={activeTab}
        >
          {feedbackItem(data, index)}
        </FeedbackListRoadmap>
      );
    });

  const TabMenu = () => (
    <ul className='tabs__navlist' role='tablist'>
      {statusList.map((status, index) => {
        const statusFeedback = status['Status'].toLowerCase();

        return (
          <li
            className={`tabs__nav-item ${
              activeTab === `tab-label-${statusFeedback}` ? 'is-active' : ''
            } tabs__nav-item--${statusFeedback} ${
              prevTab === `tab-label-${statusFeedback}` ? 'prev-active' : ''
            }`}
            role='presentation'
            key={status['Order']}
          >
            <button
              id={`tab-label-${statusFeedback}`}
              role='tab'
              tabIndex={`${
                activeTab === `tab-label-${statusFeedback}` ? 0 : -1
              }`}
              aria-controls={`tab-panel-${statusFeedback}`}
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-selected={`${
                activeTab === `tab-label-${statusFeedback}` ? true : false
              }`}
              aria-setsize='3'
              aria-posinset={index + 1}
              onClick={handleClick}
            >
              <span className='h3'>
                {status['Status']} ({feedback[index].length})
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );

  const feedbackAdded = () => {
    setShowModal(!showModal);

    setTimeout(() => {
      history.push('/');
    }, 100);
  };

  const closeModal = (e) => {
    if (e.target.parentNode.hasAttribute('data-operation-running')) return;

    setShowModal(!showModal);
  };

  const openModal = (
    <Modal onClose={closeModal} isOpen='modal__is-open'>
      <CreateFeedback feedbackAdded={feedbackAdded} closeModal={closeModal} />
    </Modal>
  );

  const handleClick = (e) => {
    const buttonEl = e.target.parentNode;
    if (buttonEl.classList.contains('is-active')) return;

    setPrevTab(activeTab);
    setActiveTab(e.target.id);
  };

  const handleKeyDown = (e) => {};

  const loadFeedback = async (abortCont) => {
    try {
      const res = await fetch(`/api/getFeedbackStatus`, {
        signal: abortCont.signal,
      });
      const statusRes = await res.json();

      setStatusList(statusRes.statusList);
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

    document.addEventListener('keydown', handleKeyDown);
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
            <div className='header-tertiary__title'>
              <Button
                typeAttribute='button'
                buttonStyle='button--back-dark'
                svgIcon='chevron-left'
                onClick={() => history.goBack()}
              >
                Go Back
              </Button>
              <p className='h1'>Roadmap</p>
            </div>
            <div className='header-tertiary__create-feedback'>
              <Button
                typeAttribute='button'
                buttonStyle='button--primary'
                svgIcon='sign'
                onClick={() => setShowModal(!showModal)}
              >
                Add Feedback
              </Button>
            </div>
          </div>
        </header>
        <main className='roadmap-page roadmap-page__content'>
          {loading ? (
            <Loader />
          ) : (
            <>
              <TabMenu />
              <FeedbackList />
            </>
          )}
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
