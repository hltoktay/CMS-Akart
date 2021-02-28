const express = require('express');
const path = require("path");
const exphbs  = require('express-handlebars');
const bodyParser = require('body-parser')
const flash = require('connect-flash')
const mongoose = require('mongoose');
const multer = require('multer');
const methodOverride = require('method-override');
const session = require("express-session");
const bcrypt = require('bcryptjs');
const passport = require('passport')
const { ensureAuthenticated } = require('./helpers/auth');

const app = express();


// Passport Config
require('./config/passport')(passport)

// DB CONFIG
const db = require("./config/database");

//Map global promise - get rid of warning
mongoose.Promise = global.Promise;

// Connect to mongoose
mongoose.connect(db.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
  .then(() => console.log('MongoDB Connected....'))
  .catch(err => console.log(err));

  //Load Project & User Model
  require('./models/project');
  const Project = mongoose.model('projects');
  require('./models/user');
  const User = mongoose.model('users');

//Handlebars Middlewars
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
    }));
app.set('view engine', 'handlebars');

//Body parer middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session())

app.use(flash())

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
})

// Static Folder
app.use(express.static(path.join(__dirname, "/public")));

// Index Route
app.get('/', (req, res) => {
    const title = 'Welcome1'
    res.render('index', {
        title: title
    })
});

// About route
app.get('/about', (req, res) => {
    res.render('about')
})

// Service Route
app.get('/services', (req, res) => {
    res.render('services')
})

// Contact Route
app.get('/contact', (req, res) => {
    res.render('contact')
})


// Project Index Page
app.get('/projects', ensureAuthenticated, (req, res) => {
    Project.find({})
    .lean()
    .then((projects) => {
        res.render('projects/index', {
            projects: projects,
        });
    })
})

// ALL Project Index Page
app.get('/all-projects', (req, res) => {
    Project.find({})
    .lean()
    .then((projects) => {
        res.render('all_projects', {
            projects: projects,
        });
    })
})


// User Login Route
app.get('/admin/login', (req, res) => {
    res.render('users/login')

})

// User Register Route
app.get('/admin/register', (req, res) => {
    res.render('users/register')
})

// Login Form post
app.post('/admin/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/projects',
        failureRedirect: '/admin/login',
        failureFlash: true
    })(req, res, next);
})

// Register Form post
app.post('/admin/register', (req, res) => {
    let errors = [];

    if(req.body.password != req.body.password2) {
        errors.push({text: 'Password do not match!'})
    }

    if(req.body.password.length < 4){
        errors.push({text: 'Password must be at least 4 characters'})
    }

    if (errors.length > 0) {
        res.render('users/register', {
            errors: errors,
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            password2: req.body.password2,
        })
    } else {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user) {
                    req.flash('error_msg', 'Email already registered');
                    res.redirect('/admin/register')
                } else {
                    const newUser = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: req.body.password,
                    })

                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'Registered, you can login..')
                                    res.redirect('/admin/login')
                                })
                                .catch(err => {
                                    console.log(err);
                                    return;
                                })
                        });
                    });
                }
            })

    }
})

// Add Project Form
app.get('/projects/add', ensureAuthenticated, (req, res) => {
    res.render('projects/add');
})

// Edit Project Form
app.get('/projects/edit/:id', ensureAuthenticated, (req, res) => {
    Project.findOne({
        _id: req.params.id
    })
    .lean()
    .then(project => {
    res.render('projects/edit', {
        project: project
    });
    })
})

// Single Project Display
app.get('/projects/:id', (req, res) => {
   Project.findOne({
        _id: req.params.id,
    })
    .lean()
    .then(project => {

    res.render('projects/single', {
        project: project
    });
    })
})


// Store the images wirth multer
const storage = multer.diskStorage({
    //destionation for file
    destination: function (req, file, callback) {
        callback(null, ("./public/uploads"))
    },

    //add back the extension
    filename: function(req, file, callback) {
        callback(null, Date.now()+ file.originalname)
    }
});

// upload parameter for multer
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024*1024*3,
    }
})

const imageData = Project.find({})

// Process Form
app.post('/projects', upload.single("image"), (req, res) => {

    let errors = [];

    if(!req.body.title){
        errors.push({text: 'Please add a title'})
    }
     if(!req.body.location){
        errors.push({text: 'Please add a location'})
    }
     if(!req.body.sector){
        errors.push({text: 'Please choose a sector'})
    }
     

    if(errors.length > 0){
        res.render('projects/add', {
            errors: errors,
            title: req.body.title,
            location: req.body.location,
            sector: req.body.sector
        });
    } else {
        const newUser = {
            title: req.body.title,
            client: req.body.client,
            location: req.body.location,
            surface: req.body.surface,
            website: req.body.website,
            sector: req.body.sector,
            work: req.body.work,
            details: req.body.details,
            imagename: req.file.filename
        }
        new Project(newUser)
        .save(function(err, doc) {
            if(err) throw err;

                imageData.exec(function(err, data) {
                    if(err) throw err;
                    req.flash('success_msg', 'Project added...')
                    res.redirect('/projects')
                })
        })
    }
})

// Edit Form Process 
app.put('/projects/:id', ensureAuthenticated, (req, res) => {
    Project.findOne({
        _id: req.params.id
    })
    .then(project => {
        // new value
        project.title = req.body.title;
        project.client = req.body.client;
        project.location = req.body.location;
        project.surface = req.body.surface;
        project.website = req.body.website;
        project.sector = req.body.sector;
        project.work = req.body.work;
        project.details = req.body.details;


        project.save().then(project => {
            req.flash('success_msg', 'Project updated...')
                res.redirect('/projects');
            })
    })  
})

// Delete Project
app.delete('/projects/:id', ensureAuthenticated, (req, res) => {
    Project.remove({_id: req.params.id})
    .then(() => {
        req.flash('success_msg', 'Project removed...')
        res.redirect('/projects');
    })
})

// Logout User
app.get('/admin/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', 'Admin Logout..');
    res.redirect('/admin/login');
})  


const port = process.env.NODE_ENV || 5000;

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
    
});