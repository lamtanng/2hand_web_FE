import { Link } from '@mui/material';
import LoginForm from './components/LoginForm';

function Login() {
  return (
    <>
      <div className="mx-auto flex items-start justify-between font-sans text-base">
        <div className="mx-auto flex w-full flex-col items-center justify-start gap-8 px-52 py-20">
          <div className="mt-16 w-full">
            <p className="w-full text-[46px] font-extrabold">Getting Started</p>
            <p className="mt-6 text-left text-base text-gray-600">
              Don't have account?{' '}
              <Link href="/signup" className="font-medium no-underline">
                Sign up
              </Link>
            </p>
          </div>

          <LoginForm />
        </div>
        <div className="min-w-basis-1/2 h-screen w-full bg-blue-500"></div>
      </div>
    </>
  );
}

export default Login;
