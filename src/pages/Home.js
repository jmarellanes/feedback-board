import { useEffect, useState } from 'react';
import FeedbackList from '../components/FeedbackList';
import Header from '../components/Header';
import HeaderBrandmark from '../components/HeaderBrandmark';
import NavMain from '../components/NavMain';
import HeaderRoadmapCard from '../components/HeaderRoadmapCard';

function Home() {
  const [feedback, setFeedback] = useState([]);

  const loadFeedback = async () => {
    try {
      const res = await fetch('/api/getFeedbackList');
      const feedbackList = await res.json();
      setFeedback(feedbackList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadFeedback();
  }, []);

  return (
    <>
      <Header>
        <HeaderBrandmark title='FeedbackTo' />
        <NavMain />
        <HeaderRoadmapCard />
      </Header>
      <main className='main'>
        <FeedbackList feedbackList={feedback} />
      </main>
    </>
  );
}

export default Home;
