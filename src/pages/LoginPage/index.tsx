// import Header from '../../components/elements/Header';
import LoginForm from './components/LoginForm';

function Login() {
  return (
    <>
      {/* <Header /> */}
      <div className="flex h-screen w-full">
        <div className="flex w-full items-center justify-center lg:w-10/12">
          <LoginForm />
        </div>
        <div className="relative hidden h-full w-full items-center justify-center bg-blue-50 lg:flex">
          <div className="h-60 w-60 animate-bounce rounded-full bg-gradient-to-tr from-blue-700 to-blue-200"></div>
          <div className="absolute bottom-0 h-1/2 w-full bg-white/10 backdrop-blur-lg"></div>
        </div>
      </div>
    </>
  );
}

export default Login;
