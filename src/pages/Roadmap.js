import { useState, useEffect } from 'react';

function Roadmap() {
  const [feedbackPlanned, setFeedbackPlanned] = useState([]);
  const [feedbackInProgress, setFeedbackInProgress] = useState([]);
  const [feedbackLive, setFeedbackLive] = useState([]);

  const loadFeedback = async (abortCont) => {
    try {
      const res = await fetch(`/api/getStatus`, { signal: abortCont.signal });
      const statusRes = await res.json();

      setFeedbackPlanned(statusRes.planned);
      setFeedbackInProgress(statusRes.inProgress);
      setFeedbackLive(statusRes.live);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const abortCont = new AbortController();

    loadFeedback(abortCont);

    return () => {
      abortCont.abort();
    };
  }, []);

  return (
    <div id='roadmap-page__wrapper'>
      Placeholder for Top Bar
      <main className='roadmap-page__content'></main>
    </div>
  );
}

export default Roadmap;
