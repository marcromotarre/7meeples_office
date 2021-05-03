import devir_white from "../../assets/devir.png";
import devir_black from "../../assets/devir.png";

import asmodee_white from "../../assets/asmodee.png";
import asmodee_black from "../../assets/asmodee.png";

import tranjis_white from "../../assets/tranjis.png";
import tranjis_black from "../../assets/tranjis.png";

import melmac_white from "../../assets/melmac.png";
import melmac_black from "../../assets/melmac.png";

import mercurio_white from "../../assets/mercurio.png";
import mercurio_black from "../../assets/mercurio.png";

import zacatrus_white from "../../assets/zacatrus.png";
import zacatrus_black from "../../assets/zacatrus.png";

import gabinete_ludico_white from "../../assets/gabinete_ludico.png";
import gabinete_ludico_black from "../../assets/gabinete_ludico.png";

import generacion_x_white from "../../assets/generacion_x.png";
import generacion_x_black from "../../assets/generacion_x.png";

import edge_white from "../../assets/edge.png";
import edge_black from "../../assets/edge.png";

import do_it_white from "../../assets/do_it.png";
import do_it_black from "../../assets/do_it.png";

import maldito_white from "../../assets/maldito-games.png";
import maldito_black from "../../assets/maldito-games.png";

import arrakis_white from "../../assets/arrakis.png";
import arrakis_black from "../../assets/arrakis.png";

import sd_white from "../../assets/sd.png";
import sd_black from "../../assets/sd.png";

export const getPublisherImage = ({ id, theme = "white" }) => {
  switch (id) {
    case 36401:
      return getImage(arrakis_white, arrakis_black, theme);
    case 157:
      return getImage(asmodee_white, asmodee_black, theme);
    case 2366:
      return getImage(devir_white, devir_black, theme);
    case 30091:
      return getImage(tranjis_white, tranjis_black, theme);
    case 45074:
      return getImage(melmac_white, melmac_black, theme);
    case 7772:
      return getImage(mercurio_white, mercurio_black, theme);
    case 25973:
      return getImage(zacatrus_white, zacatrus_black, theme);
    case 8500:
      return getImage(gabinete_ludico_white, gabinete_ludico_black, theme);
    case 8351:
      return getImage(generacion_x_white, generacion_x_black, theme);
    case 2973:
      return getImage(edge_white, edge_black, theme);
    case 39751:
      return getImage(do_it_white, do_it_black, theme);
    case 30677:
      return getImage(maldito_white, maldito_black, theme);
    case 33010:
      return getImage(sd_white, sd_black, theme);
  }
};

const getImage = (white, black, theme) => {
  return theme === "white" ? white : black;
};
