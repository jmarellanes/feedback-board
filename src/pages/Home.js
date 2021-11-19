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
  const { categorySlug } = useParams();

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
          <SortBy />
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
