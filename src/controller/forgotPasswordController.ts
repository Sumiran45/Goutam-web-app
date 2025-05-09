import api from "../Api/api";

export const forgotPasswordRequest = async (emailOrUsername:string) => {
  try {
    const response = await api.post('/forgot-password', {
      email_or_username: emailOrUsername,
    });
    return {
      success: true,
      message: response.data.message,
    };
  } catch (error:any) {
    let errorMessage = 'An unexpected error occurred.';
    
    if (error.response && error.response.data) {
      errorMessage = error.response.data.detail || errorMessage;
    }
    
    return {
      success: false,
      message: errorMessage,
    };
  }
};