// craco.config.js
module.exports = {
    style: {
      sass: {
        loaderOptions: {
          sassOptions: {
            includePaths: [path.resolve(__dirname, 'src')],
          },
        },
      },
    },
  };
