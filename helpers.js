// Set user info from request
export  const setUserInfo = (request) => {
    // console.log("how it find this" +request.gravatar)
    // console.log("should be this" +request.profile.gravatar)    
    const getUserInfo = {
      _id: request._id,
      userName: request.profile.userName,
      firstName: request.profile.firstName,
      lastName: request.profile.lastName,
      country: request.profile.country,
      role: request.profile.role,
      email: request.email,
      gravatar: request.profile.gravatar
    };
    // console.log(getUserInfo)
    return getUserInfo;
  };
  

	
