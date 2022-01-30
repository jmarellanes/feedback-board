import { ReactComponent as Illustration } from '../assets/images/no-feedback.svg';

function NoFeedback() {
  return (
    <div className='home-page__feedback-empty'>
      <Illustration />
      <h2>There is not Feedback yet.</h2>
      <p>Got a suggestion? Found a bug that needs to be squashed?</p>
      <p>We love hearing about new ideas to improve our app.</p>
    </div>
  );
}

export default NoFeedback;
