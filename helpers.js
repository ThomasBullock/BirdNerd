// Set user info from request
export  const setUserInfo = (request) => {
    const getUserInfo = {
      _id: request._id,
      firstName: request.profile.firstName,
      lastName: request.profile.lastName,
      role: request.profile.role,
      email: request.email,
    };
  
    return getUserInfo;
  };
  

	
