import React from "react";

import { motion } from "framer-motion";
import { fadePresent } from "../../../animation";
import { Spin } from "antd";

import style from './Loader.module.scss'

export function Loader () {
   return (
      <motion.div className={ style.Loader }
                  variants={fadePresent}
                  initial={'initial'}
                  animate={'animate'}
      >
         <Spin size="large"/>
         <p>Одну секундочку..</p>
      </motion.div>
   );
}