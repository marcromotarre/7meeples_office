import axios from "axios";

export const get_publishers = async () => {
  return await axios
    .get("/api/publishers/getAll")
    .then((response) => {
      return response.data.publishers;
    })
    .catch(function (error) {
      console.log(error);
    });
};
