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
      <h1 className='header-main__title header-main__title--light'>{title}</h1>
      <div className='header-main__user header-main__user--light'>
        {!user ? 'Getting user info' : isUser()}
      </div>
    </div>
  );
}
