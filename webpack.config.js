const path = require('path') //to import the pathing function
const HtmlWebpackPlugin = require('html-webpack-plugin') //import the html generator plugin


module.exports = {
    mode: 'development',
    entry:{
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    //define an object to contain the script
    // specify js file to be processed

    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name][contenthash].js',
        clean: true,
        assetModuleFilename: '[name][ext]', //to rename asset files

    },
    //set the output path of the resulting script
    //set the name to the name of the script object

    devtool:'source-map',


    devServer:{
        static:{
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000, 
        open: true,  
        hot: true, 
        compress: true,
        historyApiFallback: true,
    },
    
    module: {
        rules: [ //array of rules
        {
            test:/\.scss$/,   //regex for .scss files
            use: [ //array of loaders for .scss
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        },
        {
            test:/\.js$/,   //regex for .js files
            exclude: /node_modules/,
            use:{
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env'],
                },
            },
        },
        {
            test:/\.(png|svg|jpg|jpeg|gif)$/i, 
            type: 'asset/resource'
         },

    
    
                ]
    },

    plugins:[
        new HtmlWebpackPlugin({
            title: 'Webpack App', //html title
            filename: 'index.html', //filename
            template: 'src/template.html', //path to template
        }),
    ],
}