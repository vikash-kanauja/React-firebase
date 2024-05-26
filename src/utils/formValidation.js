// src/validation.js
export const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      return "Email is required";
    } else if (!re.test(String(email).toLowerCase())) {
      return "Invalid email address";
    }
    return null;
  };
  export const validatePassword = (password) => {
    if (!password) {
      return "Password is required";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(password)) {
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
  
  export const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
    }else if (name.trim().length < 4) {
      return "firstName must be contain 4 character"
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
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!file) {
      return "Profile photo is required";
    } else if (!validTypes.includes(file.type)) {
      return "Invalid file type. Only images are allowed";
    }
    return null;
  };
  
  export const validateForm = (formData) => {
    const errors = {};
  
    if (formData.email !== undefined) {
      errors.email = validateEmail(formData.email);
    }
  
    if (formData.password !== undefined) {
      errors.password = validatePassword(formData.password);
    }
  
    if (formData.confirmPassword !== undefined) {
        errors.confirmPassword = validateConfirmPassword(formData.password, formData.confirmPassword);
    }

    if (formData.firstName !== undefined) {
      errors.firstName = validateName(formData.firstName);
    }
  
    if (formData.lastName !== undefined) {
      errors.lastName = validateName(formData.lastName);
    }
  
    if (formData.phoneNumber !== undefined) {
      errors.phoneNumber = validateMobileNo(formData.phoneNumber);
    }
  
    if (formData.profilePhoto !== undefined) {
      errors.profilePhoto = validateProfilePhoto(formData.profilePhoto);
    }
  
    return errors;
  };
  