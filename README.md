1. Make folders
    dist //viewing
    src//source code

2. Make src/index.js //mother script
    console.log(123)//test

3. Make dist/index.html && boilerplate //
    Add title
    Add body content
    add script src near end of body

4. Install vscode live server//later replaced by webpack live server
    view html
    //tips, if js is not loading, it may be due to typo error in the html link
    //tips use "../" to go back one level

5. Make src/generateJoke.js //app module
    function [sameNameAsFile](){
        return [statetment]
    }

    export default [sameNameAsFile] //not gonna work yet due to lack of wepack addons

6. In src/index.js
    import generateJoke  from "./generateJoke"; //import module

    console.log(generateJoke)//call module
    //Cannot use import statement outside a module 
    //can solve by adding type module at package.json but will be solved by webpack anyway

    npm init -y //y to answer all questions

    npm i -D webpack webpack-cli

    check in package.json if in dependencies, you can see webpack and webpack-cli

7. Open package.json
    remove 
        "test": "echo \"Error: no test specified\" && exit 1"  },
    replace with
        "build": "webpack --mode production" },
        
8. npm run build inside folder //compiled successfully

    check the dist/main.js //the code is simplified to the final output

    check the console//doesnt work yet because it is still referencing to the index.js


9. change index.html reference to main.js
    //joke appears on console

10. See 9:14 for importing webpack modules
    npm remove [moduleName] 

11. Make 
    /webpack.config.js

    insert
    
    module.exports = {
    mode: 'development',}

    in package.json, change script from 
            "build": "webpack --mode production"},
        to

            "build": "webpack"},


12. In  src/webpack.config.js

    const path = require('path') 
    //to import the pathing function

    entry:{
        bundle: path.resolve(__dirname, 'src/index.js')
    },
    //define an object to contain the script, and specify js to be processed

    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    }
    //set the output path of the resulting script
    //set the name to the name of the script object

    set index.html source to bundle.js

    npm run build



13. install sass loaders to be able to parse sass styles

    npm i -D sass style-loader css-loader sass-loader //install loaders


14. make

    src/styles/main.scss

    get styles from SASS


15. in index.js

    import './styles/main.scss' //to get the style into the code

    npm run build //error, no loader configured for .scss

16. in webpack.config.js

    add a ',' after the 'exports' module

    then write

    module: {
        rules: [ //array of rules
        {
            test:/\.scss$/,   //regex for .scss files
            use: [ //array of loaders for .scss
                'style-loader',
                'css-loader',
                'sass-loader'
            ]
        }
        ]
    }
    //test for all .scss files; the parse them using style, css, and sass loaders

    npm run build



17. install html plugin to automatically generate html in the dist

    npm i -D html-webpack-plugin

18. Import the plugin to the webpack config.js, write


        const HtmlWebpackPlugin = require('html-webpack-plugin')

    then after the 'module' module, add ',' and write

        plugins:[
            new HtmlWebpackPlugin({
                title: 'Webpack App', //html title
                filename: 'index.html', //filename
                template: 'src/template.html', //path to template
            }),
        ],

    npm run build

19. Make 

        src/template.html

    boilerplate

    change title to inherit the webpack config title

        <%= htmlWebpackPlugin.options.title>

    in the body add

            <div class="container"></div>

20. randomize or hash asset filenames to avoid caching

    in webpack.config.js, change to

        filename: '[name][contenthash].js'

21. install webpack server

    package.json scripts, add comma then add

        "dev": "webpack serve"
    
    npm run dev //installs web sever which runs at port 8080

    yes

    to check, open
    
        http://localhost:8080/ 

22. In webpack.config.js, after the output module

    devServer:{
        static:{
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3000,//port for frontend
        open: true,  //open browser
        hot: true, //reloading
        compress: true, //gzip compression
        historyApiFallback: true,
    },

    npm run dev

    //auto open the html


23. auto clean dist during build

    in webpack.config.js, after filename, add 

    clean: tr

24. make a source map to locate code problems

    in webackconfig

    after outfut

    add

    devtool:'source-map',

    npm run build

25. Compatibility with older browsers

    npm i -D babel-loader @babel/core @babel/preset-env

    check in package.json if babel core and babel preset are available as dependencies

    in webpack.config.js

    after the test for .scss, add

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


    npm run build


26. import an image

    copy image to src/assets

    in index.js

    import laughing from './assets/laughing.svg'

    in webpack.config.js, after the .js test

    {
            test:/\.(png|svg|jpg|jpeg|gif)$/i, 
            type: 'asset/resource'
    },

    after 'clean:true', add

    assetModuleFilename: '[name][ext]', //to rename asset files

    npm run build

    in template.html
    
    <img alt="" id="laughImg">


    in index.js

    const laugImg = document.getElementById('laughImg') //anchor point for image
    laughImg.src = laughing //set the source of the img element, set to the imported element



27. joke functionality

    npm i axios

28. import axios, in generateJoke.js

    import axios from 'axios'


    edit function to

    function generateJoke(){
        const config = {
            headers:{
                Accept: 'application/json'
            }
        }

        axios.get('https://icanhazdadjoke.com', config).then((res) =>{
            document.getElementById('joke').innerHTML = res.data.joke
        })

    }

    //causes jokes to load upon open


29. button trigger

    in index.js, after const laughing

    const jokeBtn = document.getElementById('jokeBtn') //button as object

    jokeBtn.addEventListener('click', generateJoke) //trigger

    generateJoke() //initial call









    ********************************************
https://youtu.be/IZGNcSuwBZs?t=2092   
 ********************************************