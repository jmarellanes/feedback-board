import { useEffect, useState, useRef } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import queryComponent from 'query-string';
import { ReactComponent as Bulb } from '../assets/images/bulb.svg';

import Button from '../components/Button';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import SortBy from '../components/SortBy';
import FeedbackTopBar from '../components/FeedbackTopBar';
import Modal from '../components/Modal';
import CreateFeedback from '../components/CreateFeedback';
import FeedbackItem from '../components/FeedbackItem';
import NoFeedback from '../components/NoFeedback';

import { categoriesData } from '../utils/data';

function Home() {
  const [feedback, setFeedback] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);

  const updateSortByLabelRef = useRef();

  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [createdFeedback, setCreatedFeedback] = useState(false);

  const [fadeOutFeedback, setFadeOutFeedback] = useState(false);

  const { categoryParam } = useParams();
  const { search } = useLocation();
  const history = useHistory();

  const queryString =
    queryComponent.parse(search).sortby === undefined
      ? 'most-upvotes'
      : queryComponent.parse(search).sortby;

  // Redirect to '/' if category doesn't exists.
  const categoryFormatted = () => {
    let data = categoriesData.find((category) => category === categoryParam);
    return !data ? history.push('/') : data;
  };

  // Run loadFeedback after adding new feedback
  const feedbackAdded = () => {
    setCreatedFeedback(!createdFeedback);
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

  // Update "Sort By" dropdown label. This fn is called when category is changed.
  const updateSortByLabel = () => {
    if (queryComponent.parse(search).sortby === undefined) {
      updateSortByLabelRef.current.updateSort();
    }
  };

  const loadFeedback = async (abortCont) => {
    // Close modal after adding new feedback
    if (showModal) setShowModal(false);
    // Hide <No Feedback> component on first load
    if (feedback.length === 0) setLoading(true);
    updateSortByLabel();

    try {
      setFadeOutFeedback(true);

      const res = await fetch(
        `/api/getFeedbackList/?categoryParam=${categoryFormatted()}&sortBy=${queryString}`,
        { signal: abortCont.signal }
      );
      const feedbackRes = await res.json();

      setFeedback(feedbackRes.feedbackList);
      setCategories(feedbackRes.categoriesList);
      setStatus(feedbackRes.statusList);
    } catch (error) {
      console.log(error);
    }

    setFadeOutFeedback(false);

    if (!abortCont.signal.aborted) setLoading(false);
  };

  useEffect(() => {
    const abortCont = new AbortController();

    loadFeedback(abortCont);

    return () => {
      abortCont.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam, createdFeedback]);

  return (
    <>
      <div id='home-page__wrapper'>
        <Header categories={categories} status={status} />

        <main className='home-page__feedback'>
          <FeedbackTopBar>
            <div className='h3 feedback-topbar__title'>
              <Bulb />{' '}
              {`${feedback.length} ${
                feedback.length > 1 ? 'Suggestions' : 'Suggestion'
              }`}
            </div>
            <SortBy
              feedback={feedback}
              setFeedback={setFeedback}
              ref={updateSortByLabelRef}
            />
            <Button
              typeAttribute='button'
              buttonStyle='button--primary'
              svgIcon='sign'
              onClick={() => setShowModal(!showModal)}
            >
              Add Feedback
            </Button>
          </FeedbackTopBar>
          <FeedbackList
            loading={loading}
            fadeOutFeedback={fadeOutFeedback}
            setLoading={setLoading}
            feedback={feedback}
          >
            {console.log(feedback[0]?.fields)}
            {feedback[0]?.fields === null ? (
              <NoFeedback />
            ) : (
              feedback.map((data) => {
                const fb = data.fields;

                return (
                  <FeedbackItem
                    title={fb.Title}
                    description={fb.Description}
                    category={fb.Category}
                    comments={fb.TotalComments}
                    key={fb.FeedbackId}
                    id={fb.FeedbackId}
                    upvotedBy={fb.UpvotedBy ? fb.UpvotedBy : []}
                    totalUpvotes={fb.TotalUpvotes}
                    link
                    categoryActive
                  />
                );
              })
            )}
          </FeedbackList>
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

export default Home;
