import { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';

import { CSSTransition } from 'react-transition-group';
import queryComponent from 'query-string';
import { ReactComponent as Bulb } from '../assets/images/bulb.svg';

import Button from '../components/Button';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import HeaderBrandmark from '../components/HeaderBrandmark';
import NavMain from '../components/NavMain';
import RoadmapCard from '../components/RoadmapCard';
import SortBy from '../components/SortBy';
import FeedbackTopBar from '../components/FeedbackTopBar';
import Modal from '../components/Modal';
import CreateFeedback from '../components/CreateFeedback';
import FeedbackItem from '../components/FeedbackItem';
import Upvotes from '../components/Upvotes';

import { categoriesData } from '../utils/data';

function Home() {
  const [feedback, setFeedback] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);

  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState('Most Upvotes');
  const [showModal, setShowModal] = useState(false);
  const [createdFeedback, setCreatedFeedback] = useState(false);

  const { categoryParam } = useParams();
  const { search } = useLocation();
  const history = useHistory();

  const updateUpvotesParentState = (arr, id) => {
    let updateState = feedback.map((item) => {
      if (item.fields.FeedbackId === id) {
        return {
          fields: { ...item.fields, UpvotedBy: arr, TotalUpvotes: arr.length },
        };
      }
      return item;
    });

    setFeedback(updateState);
  };

  const queryString =
    queryComponent.parse(search).sortby === undefined
      ? 'most-upvotes'
      : queryComponent.parse(search).sortby;

  const updateSortLabelOnLoad = () => {
    const sortLabel = {
      'Most Upvotes': 'most-upvotes',
      'Least Upvotes': 'least-upvotes',
      'Most Comments': 'most-comments',
      'Least Comments': 'least-comments',
    };

    const updateLabel = Object.keys(sortLabel).find(
      (key) => sortLabel[key] === queryString
    );

    setSortValue(updateLabel);
  };

  const handleChange = (newSortOrder) => {
    setSortValue(newSortOrder);
    sortFeedbackWithDropdown(newSortOrder, feedback);
    updateQueryString(newSortOrder);
  };

  const sortFeedbackWithDropdown = (type, data) => {
    const sortedFeedback = [...data].sort((a, b) => {
      if (type === sortValue) return null;
      switch (type) {
        case 'Least Upvotes':
          return a.fields.TotalUpvotes - b.fields.TotalUpvotes;
        case 'Most Comments':
          return b.fields.TotalComments - a.fields.TotalComments;
        case 'Least Comments':
          return a.fields.TotalComments - b.fields.TotalComments;
        default:
          return b.fields.TotalUpvotes - a.fields.TotalUpvotes;
      }
    });

    setFeedback(sortedFeedback);
  };

  const updateQueryString = (query) => {
    history.push(`?sortby=${query.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const categoryFormatted = () => {
    let data = categoriesData.find((category) => category === categoryParam);
    return !data ? history.push('/') : data;
  };

  const loadFeedback = async (abortCont) => {
    updateSortLabelOnLoad();

    try {
      setLoading(true);

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

    // Close modal after Create feedback
    if (showModal) setShowModal(false);

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

  const closeModal = (e) => {
    if (e.target.parentNode.hasAttribute('data-operation-running')) return;

    setShowModal(!showModal);
  };

  const feedbackAdded = () => {
    setCreatedFeedback(!createdFeedback);
  };

  const openModal = (
    <Modal onClose={closeModal} isOpen='modal__is-open'>
      <CreateFeedback feedbackAdded={feedbackAdded} onClick={closeModal} />
    </Modal>
  );

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
            <SortBy value={sortValue} onChange={handleChange} />
            <Button
              typeAttribute='button'
              buttonStyle='button--primary'
              svgIcon='sign'
              onClick={() => setShowModal(!showModal)}
            >
              Add Feedback
            </Button>
          </FeedbackTopBar>
          <FeedbackList loading={loading}>
            {feedback.map((data) => {
              const fb = data.fields;

              return (
                <FeedbackItem
                  title={fb.Title}
                  description={fb.Description}
                  category={fb.Category}
                  comments={fb.TotalComments}
                  key={fb.FeedbackId}
                  id={fb.FeedbackId}
                  link
                  categoryActive
                >
                  <Upvotes
                    upvotedBy={fb.UpvotedBy ? fb.UpvotedBy : []}
                    id={fb.FeedbackId}
                    updateUpvotesParentState={updateUpvotesParentState}
                  >
                    {fb.TotalUpvotes}
                  </Upvotes>
                </FeedbackItem>
              );
            })}
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
