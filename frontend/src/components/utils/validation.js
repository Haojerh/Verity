export const validatePassword = (password) => {
    if (password.length < 8) {
      return "At least 8 characters required";
    }

    if (!/[A-Z]/.test(password)) {
      return "Must contain 1 uppercase letter";
    }

    if (!/[0-9]/.test(password)) {
      return "Must contain 1 number";
    }

    if (!/[!@#$%^&*]/.test(password)) {
      return "Must contain 1 special character";
    }

    return "";
};