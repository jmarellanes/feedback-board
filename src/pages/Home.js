import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import HeaderBrandmark from '../components/HeaderBrandmark';
import NavMain from '../components/NavMain';
import HeaderRoadmapCard from '../components/HeaderRoadmapCard';

function Home() {
  const [feedback, setFeedback] = useState([]);
  const [categories, setCategories] = useState([]);
  const { categorySlug } = useParams();

  useEffect(() => {
    const loadFeedback = async () => {
      try {
        const res = await fetch(
          `/api/getFeedbackList/?categorySlug=${categorySlug}`
        );
        const feedbackList = await res.json();
        setFeedback(feedbackList.formattedFeedbackList);
        setCategories(feedbackList.categoriesList);
      } catch (error) {
        console.log(error);
      }
    };

    loadFeedback();
  }, [categorySlug]);

  return (
    <>
      <Header>
        <HeaderBrandmark title='FeedbackTo' />
        <NavMain categories={categories} />
        <HeaderRoadmapCard />
      </Header>
      <main className='main'>
        <FeedbackList feedbackList={feedback} />
      </main>
    </>
  );
}

export default Home;
