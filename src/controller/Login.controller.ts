export const validateLogin = (email: string, password: string) => {
    const newErrors: { email?: string; password?: string } = {};
  
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Invalid email format';
    }
  
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Minimum 6 characters';
    }
  
    return {
      isValid: Object.keys(newErrors).length === 0,
      newErrors,
    };
  };
  