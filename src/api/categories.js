import axios from "axios";

export const get_categories = async () => {
  return await axios
    .get("/api/categories/getAll")
    .then((response) => {
      return response.data.categories;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const get_category = async ({ id }) => {
  return await axios
    .post("/api/categories/get", {
      id,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const update_category = async ({
  id,
  name,
  webname,
  description,
  image,
}) => {
  return await axios
    .post("/api/categories/update", {
      id,
      name,
      webname,
      description,
      image,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const add_category = async ({
  id,
  name,
  webname = "",
  description = "",
}) => {
  return await axios
    .post("/api/categories/add", {
      id,
      name,
      webname,
      description,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
