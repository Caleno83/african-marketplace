import axios from "axios";

const axiosWithAuth = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: "https://african-american.up.railway.app/",
    headers: {
      Authorization: token,
    },
  });
};

export default axiosWithAuth;
