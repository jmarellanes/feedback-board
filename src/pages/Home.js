import { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import queryComponent from 'query-string';

import Button from '../components/Button';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import HeaderBrandmark from '../components/HeaderBrandmark';
import NavMain from '../components/NavMain';
import RoadmapCard from '../components/RoadmapCard';
import SortBy from '../components/SortBy';
import FeedbackTopBar from '../components/FeedbackTopBar';
import { ReactComponent as Bulb } from '../assets/images/bulb.svg';
import Modal from '../components/Modal';
import CreateFeedback from '../components/CreateFeedback';

function Home() {
  const [feedback, setFeedback] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);

  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState('Most Upvotes');
  const [showModal, setShowModal] = useState(false);

  const { categoryParam } = useParams();
  const history = useHistory();

  const { search } = useLocation();
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
          return a.fields.Upvotes - b.fields.Upvotes;
        case 'Most Comments':
          return b.fields.TotalComments - a.fields.TotalComments;
        case 'Least Comments':
          return a.fields.TotalComments - b.fields.TotalComments;
        default:
          return b.fields.Upvotes - a.fields.Upvotes;
      }
    });

    setFeedback(sortedFeedback);
  };

  const updateQueryString = (query) => {
    history.push(`?sortby=${query.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const loadFeedback = async () => {
    updateSortLabelOnLoad();

    try {
      setLoading(true);
      const res = await fetch(
        `/api/getFeedbackList/?categoryParam=${categoryParam}&sortBy=${queryString}`
      );
      const feedbackRes = await res.json();
      setFeedback(feedbackRes.feedbackList);
      setCategories(feedbackRes.categoriesList);
      setStatus(feedbackRes.statusList);
    } catch (error) {
      console.log(error);
    }

    if (showModal) setShowModal(false);
    setLoading(false);
  };

  useEffect(() => {
    loadFeedback();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryParam]);

  const closeModal = (e) => {
    if (e.target.parentNode.hasAttribute('data-operation-running')) return;

    setShowModal(!showModal);
  };

  const openModal = (
    <Modal onClose={closeModal} isOpen='modal__is-open'>
      <CreateFeedback feedbackAdded={loadFeedback} onClick={closeModal} />
    </Modal>
  );

  return (
    <>
      <div id='home-page__wrapper'>
        <Header>
          <HeaderBrandmark title='FeedbackTo' />
          <NavMain categories={categories} />
          <RoadmapCard statusList={status} />
        </Header>
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
          <FeedbackList feedbackList={feedback} loading={loading} />
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
