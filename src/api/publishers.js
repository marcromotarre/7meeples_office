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

export const add_publisher = async ({ id, name, description, image }) => {
  return await axios
    .post("/api/publishers/add", { id, name, description, image })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return { error: error };
    });
};
