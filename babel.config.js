const config = {
  presets: [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry",
        targets: "> 0.25%, not dead"
      }
    ]
  ]
};

module.exports = config;
