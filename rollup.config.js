// rollup.config.js
import typescript from "@rollup/plugin-typescript";

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
  output: {
    dir: "dist",
    format: "cjs",
  },
  plugins: [typescript()],
};
