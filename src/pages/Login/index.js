import React, { useContext } from 'react';
import './styles.scss';
import axiosInstance from 'utils/fetcher';
import Form from 'components/form';
import { AuthContext } from 'src/context/authContext';
import { fields, initialValues } from './fields';

const Login = ({ history }) => {
  const [, setAuth] = useContext(AuthContext);

  const submitForm = async (value, props) => {
    console.log(props);
    try {
      const res = await axiosInstance.post(
        'https://calm-oasis-43947.herokuapp.com/auth/local',
        value,
      );
      console.log(res);
      sessionStorage.setItem('token', res.jwt);
      setAuth(res.jwt);
      history.push('/');
      props.resetForm();
    } catch (error) {
      props.resetForm();
      props.setErrors({
        serverError: error.message,
      });
    }
  };
  return (
    <div id="loginContainer">
      <div>
        <h2>Login</h2>
      </div>
      <Form
        fields={fields}
        initialValues={initialValues}
        onSubmit={submitForm}
        buttonProps={{
          children: 'Sign IN',
        }}
      />
      <button
        type="button"
        variant="contained"
        color="primary"
        className="clsRegister MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedPrimary"
        onClick={() => {
          history.push('/register');
        }}
      >
        New User? Click Here!!
      </button>
    </div>
  );
};

export default Login;
