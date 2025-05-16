//importing / requiring all the required components
const express = require('express');
const path = require('path');
const basePath = __dirname;
const fs = require('fs')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const username = [];
const password = [];
const acounts = [];
//intitialising some variables
var blogToOpen = " ";
var link = "";
var b=0;




//intitialising all the objects
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(basePath, 'views')));
var contentOfejs = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8919319784858816" crossorigin="anonymous"></script><link rel="icon" type="image/png" href="New Project.png" /><link rel="shortcut icon" type="image/x-icon" href="favicon.png"><link rel="stylesheet" href="css/utils.css"><link rel="shortcut icon" type="image/x-icon" href="favicon.png"><link rel="stylesheet" href="style_index.css"><link rel="stylesheet" href="mobile.css"><title>yashcodeblogs</title></head><body><nav class="navigation max-width-1 m-auto"><div class="nav-left"><a href="/"><span><img src="favicon.png" width="254px" alt=""></span></a><ul><li><a href="/home">Home</a></li><li><a href="#">About</a></li><li><a href="/contact">Contact</a></li><li><a href="/">Logout</a></li></ul></div><div class="nav-right"><!--hey yashmeet is the best person in this world and i am doing touch typing by standing and belief me it is full of errorsy--></div></nav><div class="max-width-1 m-auto"><hr></div><div class="m-auto content max-width-1 my-2"><div class="content-left"><h1><%=titleOf %></h1><p><%=contentOf%></h1></div><div class="content-right"><img src="img/home.svg" alt="yashcodeblogs"></div></div><hr><div class="max-width-1 m-auto last_div"></div></div><div class="footer"><p>Copyright &copy; yashcodeblogs.in </p><a href="https://www.vecteezy.com/free-vector/typewriter">Vector Credits: Vecteezy</a></div></body></html>'
let blognames = [];
let blogtitles = [];
let blogcontents = [];
app.use(express.static('views'));

//opening the page postblog
app.get('/postblog', (req, res) => {
    res.sendFile('postblog.html', { root: __dirname + '/views' });
});
//opening the home page
app.get("/", (req, res) => {
    const filePath = path.join(basePath, 'views', 'index.html');
});
//login page
app.get("/login", (req, res) => {
    res.render("home.ejs");
});
//submiting login details
app.post("/loginsubmit", (req, res) => {
    const { name, title } = req.body;
    const logindetails = { name, title };
    const uusserrname = logindetails.name;
    const passs = logindetails.title;
    const acct = logindetails.name + logindetails.title;
    

    if(acounts.includes(acct)){
        // Check if the user input is in the array
         b++;
        

        // Return 'Yes' or 'No' based on whether the user input is in the array
        
    
    }
    if(b>=1){
        res.send("yes");
    }
    else{
        res.send("no");
    }
});
//opeing account creation page
app.get("/create_account", (req, res) => {
    res.sendFile('create_account.html', { root: __dirname + '/views' });
});


//declaring some vars & consts
const lengthOf = blognames.length - 1;
var nameOp = blognames[lengthOf];

//posting a blog
app.post("/add-post", (req, res) => {
    const { name, title } = req.body;
    const newPost = { name, title, id: blognames.length + 1 };
    console.log(newPost.name);
    console.log("content " + newPost.title);
    blognames.push(newPost.name);
    blogtitles.push(newPost.name);
    blogcontents.push(newPost.title);
    link = blognames.length;

    res.send('Blog post added successfully!');
    const fileName = nameOp + ".ejs";
    var href = blognames.length;
    fs.writeFile("./views/" + blognames.length + ".ejs", contentOfejs, (err) => {
        if (err) {
            console.error("error creating file", err);
        }
        else {
            console.error('file created!');
        }
    });
    var joBhiNameRakhnaHai = blognames[link];
    console.log(link + "nameeee");
    fs.appendFile('./views/blogs.ejs', '<a href="' + href + '">' + newPost.name + '</a><br>', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });
});

//opening the blogs page
app.get("/blogs", (req, res) => {
    const lengthOf = (blognames.length) - 1;
    const nameOp = blognames[lengthOf]
    res.render("blogs.ejs")
});

//redirecting to the first blog
app.get('/1', (req, res) => {
    const ok = req.body;

    const titleOf = blogtitles[ok - 1];
    const contentOf = blogcontents[ok - 1];
    console.log(contentOf);
    const templateName = `${1}.ejs`;
    res.render(templateName, { titleOf, contentOf });
});

//redirecting to homepage
app.get('/home', (req, res) => {
    res.render("home.ejs");
});
// opening contacts page
app.get('/contact', (req, res) => {
    res.sendFile('contact.html', { root: __dirname + '/views' });
});


for (let i = 1; i <= 20000; i++) {
    app.get(`/${i}`, (req, res) => {
        const ok = req.body;

        const titleOf = blogtitles[i - 1];
        const contentOf = blogcontents[i - 1];
        console.log(contentOf);
        const templateName = `${i}.ejs`;
        res.render(templateName, { titleOf, contentOf });
    });
}
//running the website
app.listen(port, () => {
    console.log("server is running on http://localhost:"+port);
});