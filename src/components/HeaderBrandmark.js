import { useUser } from '../context/UserContext';

export default function HeaderBrandmark({ title }) {
  const [user] = useUser();

  const isUser = () => {
    return (
      <>
        <img
          className='header-main__image'
          src={user.image}
          alt={`${user.name} profile`}
        />
        <div className='header-main__name'>{user.name}</div>
      </>
    );
  };

  return (
    <div className='header-main__brandmark'>
      <h2 className='header-main__title'>{title}</h2>
      <div className='header-main__user'>
        {!user ? 'Getting user info' : isUser()}
      </div>
    </div>
  );
}
