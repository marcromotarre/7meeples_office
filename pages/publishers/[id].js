/** @jsxRuntime classic /
/* @jsx jsx */
import { jsx } from "theme-ui";
import React, { useState, useEffect } from "react";
import Input from "../../src/components/common/input";
import Field from "../../src/components/common/field";
import Select from "../../src/components/common/multiple-select";
import { get_publishers } from "../../src/api/publishers";

import save_icon from "../../src/assets/save-icon.svg";
import { useRouter } from "next/router";
import { get_boardgame, update_boardgame } from "../../src/api/boardgames";

export default function PublisherEdition() {
  return <div>Editar Editorial</div>;
}
