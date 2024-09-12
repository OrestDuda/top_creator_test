const esbuild = require("esbuild");

esbuild.buildSync({
  entryPoints: ["src/server.ts", "src/generateUsers.ts"],
  bundle: true,
  outdir: "dist",
  platform: "node",
  target: "es2020",
  format: "cjs",
});
