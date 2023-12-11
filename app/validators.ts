export const validate = ( type: string, field: string, password?: string) => {
    if (type === "displayName" || type === "familyAccount") {
      if (field.length < 2 && field.length > 0) {
        return true;
      } else return false;
    }
    if (type === "username") {
      if (field.length < 8 && field.length > 0) {
        return true;
      } else return false;
    }
    if (type === "password") {
      const passwordRegex =
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
      if (!passwordRegex.test(field) && field.length > 0) {
        return true;
      } else return false;
    }

    if (type === "confirmPassword") {
      if (field !== password && field.length > 0) {
        return true;
      } else return false;
    }

    if (type === "parentEmail" || type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(field) && field.length > 0) {
        return true;
      } else return false;
    }
  };