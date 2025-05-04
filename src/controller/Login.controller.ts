import api from '../Api/api';

export const validateLogin = async (
  identifier: string,
  password: string,
  setErrors: any,
  navigation: any
) => {
  const newErrors: { email?: string; password?: string } = {};

  if (!identifier) {
    newErrors.email = 'Email or username is required';
  } else if (!/\S+@\S+\.\S+/.test(identifier) && identifier.length < 3) {
    newErrors.email = 'Invalid email or username';
  }

  if (!password) {
    newErrors.password = 'Password is required';
  } else if (password.length < 6) {
    newErrors.password = 'Minimum 6 characters';
  }

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  const isEmail = /\S+@\S+\.\S+/.test(identifier);
  const payload = isEmail
    ? { email: identifier, password }
    : { username: identifier, password };

  try {
    const response = await api.post('/login', payload);

    if (response.status === 200) {
      navigation.replace('Home');
    }
  } catch (error: any) {
    if (error.response?.status === 401) {
      setErrors({ password: 'Invalid credentials' });
    } else {
      setErrors({ password: 'Something went wrong. Try again.' });
    }
  }
};
