// Login.js
import React from 'react';
// import PropTypes from 'prop-types';
import FacebookLogin from 'react-facebook-login';

const responseFacebook = (response) => {
  console.log(response);
  if (response.status === 'unknown') {
    console.log('closed window');
  }
};

const Login = () => (
  <div className="login">
    <FacebookLogin
      appId="522135891571795"
      autoLoad
      fields="name,email,picture"
      callback={responseFacebook}
    />
  </div>);

// Login.propTypes = {
// id: PropTypes.string.isRequired,
// };

// Login.defaultProps = {
// id: '',
// };

export default Login;
