import axios from "axios";

export const get_mechanisms = async () => {
  return await axios
    .get("/api/mechanisms/getAll")
    .then((response) => {
      return response.data.mechanisms;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const get_mechanism = async ({ id }) => {
  return await axios
    .post("/api/mechanisms/get", {
      id,
    })
    .then((response) => {
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
};

export const add_mechanism = async ({
  id,
  name,
  webname = "",
  description = "",
}) => {
  return await axios
    .post("/api/mechanisms/add", {
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
