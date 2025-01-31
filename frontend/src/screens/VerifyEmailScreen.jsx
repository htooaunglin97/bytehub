import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useVerifyEmailMutation } from '../slices/usersApiSlice';
import Loader from '../components/Loader';

const VerifyEmailScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  useEffect(() => {
    const verify = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');
      const redirect = params.get('redirect') || '/';

      if (token) {
        try {
          await verifyEmail({ token }).unwrap();
          toast.success('Email verified successfully!');
          navigate(redirect);
        } catch (err) {
          toast.error(err?.data?.message || err.error);
        }
      } else {
        toast.error('Invalid verification link');
        navigate('/');
      }
    };

    verify();
  }, [location, navigate, verifyEmail, dispatch]);

  return <div>{isLoading ? <Loader /> : <h1>Verifying...</h1>}</div>;
};

export default VerifyEmailScreen;
