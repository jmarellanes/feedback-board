import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import HeaderBrandmark from '../components/HeaderBrandmark';
import NavMain from '../components/NavMain';
import RoadmapCard from '../components/RoadmapCard';

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
    <>
      <Header>
        <HeaderBrandmark title='FeedbackTo' />
        <NavMain categories={categories} />
        <RoadmapCard statusList={status} />
      </Header>
      <main className='main'>
        <FeedbackList feedbackList={feedback} loading={loading} />
      </main>
    </>
  );
}

export default Home;
