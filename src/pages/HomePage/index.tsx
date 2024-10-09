import Header from '../../components/elements/Header';
import { useAppSelector } from '../../redux/hooks';
import { loginSelector } from '../../redux/slices/login.slice';

const HomePage = () => {
  const {
    user,
  } = useAppSelector(loginSelector);
  return (
    <>
      <Header />
      <h1 className='m-40'>{user.email}</h1>
    </>
  );
};

export default HomePage;
