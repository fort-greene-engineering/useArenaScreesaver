// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import { uglify } from "rollup-plugin-uglify";

import pkg from "./package.json";

export default {
  onwarn: function (warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if (warning.code === "THIS_IS_UNDEFINED") {
      return;
    }

    // console.warn everything else
    console.warn(warning.message);
  },
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      exports: "named",
      sourcemap: true,
      strict: false,
    },
  ],
  plugins: [typescript(), uglify()],
  external: ["react", "react-dom"],
};
