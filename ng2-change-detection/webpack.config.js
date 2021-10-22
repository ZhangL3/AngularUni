var path = require('path');

module.exports = {
    entry: "./src/app.ts",
    output: {
        filename: "bundle.js"
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.ts',  '.js']
    },
    module: {
        loaders: [
            { test: /\.ts$/, loader: 'ts-loader' }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: false,
        port: 9000
    }
    // devServer: {
    //     static: {
    //     directory: path.join(__dirname, 'public'),
    //     },
    //     compress: true,
    //     port: 9000,
    // },
};