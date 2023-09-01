import { NavigateFunction } from "react-router-dom";

export const goToLogin = (navigate: NavigateFunction): void => {
   navigate("/");
};

export const goToFeed = (navigate: NavigateFunction): void => {
   navigate("/feed");
};

export const goToRegister = (navigate: NavigateFunction): void => {
   navigate("/register");
};

export const goToComments = (navigate: NavigateFunction, id: string): void => {
   navigate(`/comments/${id}`);
};
