const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports ={
    // module: {},
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "src", "index.html")
        })
    ]
}