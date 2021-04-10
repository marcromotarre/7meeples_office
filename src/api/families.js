import axios from "axios";

export const update_family = async ({
  id,
  webname,
  name,
  description,
  color,
  type,
  image,
}) => {
  return await axios
    .post("/api/families/update", {
      id,
      name,
      description,
      webname,
      color,
      type,
      image,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      return { error };
    });
};

export const get_families = async () => {
  return await axios
    .get("/api/families/getAll")
    .then((response) => {
      return response.data.families;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const get_family = async ({ id }) => {
  return await axios
    .post("/api/families/get", {
      id,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const add_family = async ({ id, name }) => {
  return await axios
    .post("/api/families/add", {
      id,
      name,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const add_family_boardgame = async ({ id, boardgame }) => {
  return await axios
    .post("/api/families/add-boardgame", {
      id,
      boardgame,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};
