import API from "./api.js";

export const register = async (username, password, repeatPassword) => {
    const response = await API.post("/Auth/register", { username, password, repeatPassword });
    return response.data;
};

export const login = async (username, password) => {
    const response = await API.post("/Auth/login", { username, password });
    return response.data;
};
export default { login, register };