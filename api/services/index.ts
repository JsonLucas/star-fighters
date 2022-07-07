import axiosInstance from "..";

export const getUserRepos = async (user: string) => {
    const request = await axiosInstance.get(`/users/${user}/repos`);
    return request;
}
