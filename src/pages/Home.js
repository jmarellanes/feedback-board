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

  return (
    <>
      <header className='header-main header'>
        <div className='header-main__container'>
          <div className='header-main__brandmark'>
            <h1>FeedbackTo</h1>
          </div>
          <nav
            className='header-main__nav-main nav-main'
            aria-labelledby='main-menu'
          >
            <h2 id='main-menu' hidden>
              Main Menu
            </h2>
            <ul className='nav-main__element'>
              <li className='nav-main__item'>
                <a href='#0' className='nav-main__link'>
                  Tags
                </a>
              </li>
            </ul>
          </nav>
          <div className='header-main__roadmap'>
            <p>Roadmap</p>
          </div>
        </div>
      </header>
      <main className='main'>
        <FeedbackList feedbackList={feedback} />
      </main>
    </>
  );
}

export default Home;
