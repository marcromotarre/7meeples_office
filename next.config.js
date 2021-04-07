const nextEnv = require("next-env");
const dotenvLoad = require("dotenv-load");
const withImages = require("next-images");

dotenvLoad();

const withNextEnv = nextEnv();
module.exports = withNextEnv();
module.exports = withImages();
