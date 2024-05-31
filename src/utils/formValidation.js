export const validateEmail = (email) => {
  if (!email.trim()) {
    return "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Email is invalid";
  }
    return null;
  };
  export const validatePassword = (password ,isSignup) => {
    if (!password) {
      return "Password is required";
    } else if (isSignup && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
      return "Password must contain at least one uppercase letter, one lowercase letter, and one digit";
  }
    return null;
  };

  export const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "Confirm password is required";
    } else if (confirmPassword !== password) {
      return "Passwords do not match";
    }
    return null;
  };
  
  export const validateName = (name,inputName) => {
    if (!name.trim()) {
      return "Name is required";
    }else if (name.trim().length < 4) {
      return `${inputName} must be contain 4 character`
    }
    return null;
  };
  
  export const validateMobileNo = (phoneNumber) => {
    const re = /^[0-9\b]+$/;
    if (!phoneNumber) {
      return "Mobile number is required";
    } else if (!re.test(String(phoneNumber)) || phoneNumber.length !== 10) {
      return "Invalid mobile number";
    }
    return null;
  };
  
  export const validateProfilePhoto = (file) => {
    if (!file) {
      return "Profile photo is required";
    } 
    return null;
  };
  
  export const validateForm = (formData,isSignup) => {
    const errors = {};
  
    if (formData.email !== undefined) {
      errors.email = validateEmail(formData.email);
    }
  
    if (formData.password !== undefined) {
      errors.password = validatePassword(formData.password,isSignup);
    }
  
    if (formData.confirmPassword !== undefined) {
        errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
    }

    if (formData.firstName !== undefined) {
      errors.firstName = validateName(formData.firstName,"First name" );
    }
  
    if (formData.lastName !== undefined) {
      errors.lastName = validateName(formData.lastName,"Last name");
    }
  
    if (formData.phoneNumber !== undefined) {
      errors.phoneNumber = validateMobileNo(formData.phoneNumber);
    }
  
    if (formData.profilePhoto !== undefined) {
      errors.profilePhoto = validateProfilePhoto(formData.profilePhoto);
    }
  
    return errors;
  };
  