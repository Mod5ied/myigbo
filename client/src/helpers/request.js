import { authService } from "../services/auth.service";

export const requestOptions = {
  headers: () => {
    const currentUser = authService.currentUser || {};
    const authHeader = currentUser.token ? { Authorization: "Bearer" + currentUser.token } : {};
  
    return {
      headers: {
        ...authHeader,
        "Content-Type": "application/json",
      },
    };
  }
};



