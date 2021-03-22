import axios from "axios";

export const update_designer = async ({ id, name, description }) => {
  return await axios
    .post("/api/designers/update", {
      id,
      name,
      description,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const get_designers = async () => {
  return await axios
    .get("/api/designers/getAll")
    .then((response) => {
      return response.data.designers;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const get_designer = async ({ id }) => {
  return await axios
    .post("/api/designers/get", {
      id,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const add_designer = async ({ id, name }) => {
  return await axios
    .post("/api/designers/add", {
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

export const add_designer_boardgame = async ({ id, boardgame }) => {
  return await axios
    .post("/api/designers/add-boardgame", {
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
