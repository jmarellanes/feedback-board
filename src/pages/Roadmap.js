import { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';

import FeedbackItem from '../components/FeedbackItem';
import Modal from '../components/Modal';
import CreateFeedback from '../components/CreateFeedback';
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

  const tabNavRef = useRef();
  const history = useHistory();

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
          {data.map((d) => {
            const fb = d.fields;

            return (
              <FeedbackItem
                title={fb.Title}
                description={fb.Description}
                category={fb.Category}
                comments={fb.TotalComments}
                key={fb.FeedbackId}
                id={fb.FeedbackId}
                status={fb.Status}
                upvotedBy={fb.UpvotedBy ? fb.UpvotedBy : []}
                totalUpvotes={fb.TotalUpvotes}
                link
                categoryActive
                roadmapFeedback
              />
            );
          })}
        </FeedbackListRoadmap>
      );
    });

  const TabMenu = () => (
    <ul className='tabs__navlist' role='tablist' ref={tabNavRef}>
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

    const tabEl = Array.from(tabNavRef.current.childNodes);
    const indexFocusEl = tabEl.indexOf(buttonEl);

    setPrevTab(activeTab);
    setActiveTab(e.target.id);

    setTimeout(() => {
      tabNavRef.current.childNodes[indexFocusEl].firstChild.focus();
    }, 100);
  };

  const handleKeyDown = (e) => {
    let UP_ARROW = 'ArrowUp',
      DOWN_ARROW = 'ArrowDown',
      LEFT_ARROW = 'ArrowLeft',
      RIGHT_ARROW = 'ArrowRight';

    const itemEl = document.activeElement.parentNode;
    if (!itemEl.classList.contains('tabs__nav-item')) return;

    const tabEl = Array.from(itemEl.parentNode.children);
    const firstTabEl = tabEl[0].firstChild;
    const lastTabEl = tabEl[tabEl.length - 1].firstChild;

    const indexFocusEl = tabEl.indexOf(itemEl);

    const changeActiveTab = (currentTab, nextTab) => {
      const currentActiveTab = statusList[currentTab]['Status'].toLowerCase();
      const nextActiveTab = statusList[nextTab]['Status'].toLowerCase();

      setPrevTab(`tab-label-${currentActiveTab}`);
      setActiveTab(`tab-label-${nextActiveTab}`);
      tabNavRef.current.childNodes[nextTab].lastChild.focus();
      e.preventDefault();
    };

    switch (e.key) {
      case RIGHT_ARROW:
      case DOWN_ARROW:
        if (document.activeElement === lastTabEl) {
          changeActiveTab(indexFocusEl, 0);
        } else {
          changeActiveTab(indexFocusEl, indexFocusEl + 1);
        }
        break;

      case LEFT_ARROW:
      case UP_ARROW:
        if (document.activeElement === firstTabEl) {
          changeActiveTab(indexFocusEl, tabEl.length - 1);
        } else {
          changeActiveTab(indexFocusEl, indexFocusEl - 1);
        }
        break;

      default:
        break;
    }
  };

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

    loadFeedback(abortCont);

    return () => {
      abortCont.abort();
    };
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusList]);

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
