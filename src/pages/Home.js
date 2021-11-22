import { useEffect, useState } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import Button from '../components/Button';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import HeaderBrandmark from '../components/HeaderBrandmark';
import NavMain from '../components/NavMain';
import RoadmapCard from '../components/RoadmapCard';
import SortBy from '../components/SortBy';
import FeedbackTopBar from '../components/FeedbackTopBar';
import { ReactComponent as Bulb } from '../assets/images/bulb.svg';
import queryString from 'query-string';

function Home(props) {
  const [feedback, setFeedback] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);

  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState('Most Upvotes');

  const { categoryParam } = useParams();
  // First letter to uppercase to match categories on database.
  const categoryParamFormatted =
    categoryParam === undefined
      ? categoryParam
      : categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
  const history = useHistory();

  const { search } = useLocation();
  const values = queryString.parse(search);
  console.log(values.sortby, categoryParam, sortValue);

  const handleChange = (newSortOrder) => {
    setSortValue(newSortOrder);
    sortFeedback(newSortOrder, feedback);
    updateQueryString(newSortOrder);
  };

  const updateQueryString = (queryString) => {
    history.push(`?sortby=${queryString.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const sortFeedback = (type, data) => {
    const sorted = [...data].sort((a, b) => {
      if (type === sortValue) return null;
      switch (type) {
        case 'Least Upvotes':
          return a.fields.Upvotes - b.fields.Upvotes;
        case 'Most Comments':
          return b.fields.Comments.length - a.fields.Comments.length;
        case 'Least Comments':
          return a.fields.Comments.length - b.fields.Comments.length;
        default:
          return b.fields.Upvotes - a.fields.Upvotes;
      }
    });

    setFeedback(sorted);
  };

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/getFeedbackList/?categoryParam=${categoryParamFormatted}&sortBy=${values.sortby}`
        );
        const feedbackRes = await res.json();
        setFeedback(feedbackRes.feedbackList);
        setCategories(feedbackRes.categoriesList);
        setStatus(feedbackRes.statusList);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    };

    loadFeedback();
  }, [categoryParamFormatted]);

  return (
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
          >
            Add Feedback
          </Button>
        </FeedbackTopBar>
        <FeedbackList feedbackList={feedback} loading={loading} />
      </main>
    </div>
  );
}

export default Home;
