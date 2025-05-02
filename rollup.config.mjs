import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "@rollup/plugin-babel";

const extensions = [".js", ".jsx"];

export default {
  input: "src/index.js",
  output: [
    { file: "dist/index.js", format: "esm", sourcemap: true },
    { file: "dist/index.cjs", format: "cjs", sourcemap: true, exports: "named" }
  ],
  plugins: [
    peerDepsExternal(),              // excludes react, react-dom, heroicons, tailwindcss
    resolve({ extensions }),
    commonjs(),
    babel({
      extensions,
      babelHelpers: "bundled",
      presets: [
        ["@babel/preset-env", { targets: ">0.25%, not dead" }],
        ["@babel/preset-react", { runtime: "automatic" }]
      ]
    })
  ]
};