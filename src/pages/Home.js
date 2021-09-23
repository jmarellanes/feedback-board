import { useEffect, useState } from 'react';
import FeedbackList from '../components/FeedbackList';

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

  return <FeedbackList feedbackList={feedback} />;
}

export default Home;
