import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import HeaderBrandmark from '../components/HeaderBrandmark';
import NavMain from '../components/NavMain';
import RoadmapCard from '../components/RoadmapCard';
import SortBy from '../components/SortBy';
import FeedbackTopBar from '../components/FeedbackTopBar';
import { ReactComponent as Bulb } from '../assets/images/bulb.svg';

function Home() {
  const [feedback, setFeedback] = useState([]);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortValue, setSortValue] = useState('Most Upvotes');
  const { categorySlug } = useParams();

  const handleChange = (newOrder) => {
    setSortValue(newOrder);
    sortFeedback(newOrder, feedback);
  };

  const sortFeedback = (type, data) => {
    const sorted = [...data].sort((a, b) => {
      switch (type) {
        case 'Least Upvotes':
          if (type === sortValue) return null;
          return a.fields.Upvotes - b.fields.Upvotes;
        case 'Most Comments':
          if (type === sortValue) return null;
          return b.fields.Comments.length - a.fields.Comments.length;
        case 'Least Comments':
          if (type === sortValue) return null;
          return a.fields.Comments.length - b.fields.Comments.length;
        default:
          if (type === sortValue) return null;
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
          `/api/getFeedbackList/?categorySlug=${categorySlug}`
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
  }, [categorySlug]);

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
