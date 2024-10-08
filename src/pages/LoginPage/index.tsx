import LoginForm from './components/LoginForm';

function Login() {
  return (
    <>
      <div className="flex h-screen w-full">
        <div className="flex w-full items-center justify-center lg:w-10/12">
          <LoginForm />
        </div>
        <div className="hidden relative h-full w-full items-center justify-center bg-blue-50 lg:flex">
          <div className="h-60 w-60 bg-gradient-to-tr from-blue-700 to-blue-200 rounded-full animate-bounce"></div>
          <div className='w-full h-1/2 absolute bottom-0 bg-white/10 backdrop-blur-lg'></div>
        </div>
      </div>
    </>
  );
}

export default Login;
