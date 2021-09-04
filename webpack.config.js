const path = require('path');
const miniCss = require('mini-css-extract-plugin');
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'css')
    },
    module: {
        rules: [{
            test:/\.(s*)css$/,
            use: [
                miniCss.loader,
                'css-loader',
                'sass-loader',
            ]
        }]
    },
    mode: "development",
    plugins: [
        new miniCss({
            filename: 'style.css',
        }),
    ]
};