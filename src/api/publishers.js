import axios from "axios";

export const get_publisher = async ({ id }) => {
  return await axios
    .post("/api/publishers/get", { id })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

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

export const add_publisher = async ({
  id,
  name,
  description,
  image,
  color,
}) => {
  return await axios
    .post("/api/publishers/add", { id, name, description, image, color })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return { error: error };
    });
};

export const delete_publisher = async ({ id }) => {
  return await axios
    .post("/api/publishers/delete", { id })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return { error: error };
    });
};

export const update_publisher = async ({
  id,
  name,
  description,
  image,
  color,
}) => {
  return await axios
    .post("/api/publishers/update", {
      id,
      name,
      description,
      image,
      color,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
