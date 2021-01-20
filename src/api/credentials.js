import axios from "axios";

export const get_user = async ({ email, password }) => {
  return await axios
    .post("/api/credentials/get", {
      email,
      password,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
