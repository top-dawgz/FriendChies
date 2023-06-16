const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './index.js',
    mode: process.env.NODE_ENV, 
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index_bundle.js',
    },
    devServer: {
        proxy: {
            '/' : 'http://localhost:3000/'
        },
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'],
    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [
                  "style-loader", 
                  {
                    loader: "css-loader",
                    options: {
                        url: true,
                    }
                  },
                ],
            },
        ],

    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'public', 'index.html')
        })
    ]
};
