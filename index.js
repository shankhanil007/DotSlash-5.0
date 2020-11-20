const express = require('express');
const app = express();
const hbs = require('hbs');
const http = require('http').Server(app);
const port = process.env.PORT || 5000;
const admin = require("firebase-admin");

const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://dotslash4-8b10e.firebaseio.com"
});
let db = admin.firestore();

let server = app.listen(port, () => {
    console.log('listening on port 5000');
})


// express middleware setup
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use('/bower_components', express.static(__dirname + '/bower_components'));

// partial setup
hbs.registerPartials(__dirname + '/views/partials');

// App routes
app.get('/', (req, res) => {
    res.render('home');
})

app.get('/final', (req, res) => {
    res.render('final1');
});


app.get('/coc', (req, res) => {
    res.render('coc');
});

app.post('/api/users', (req, res) => {
    let {
        teamName,
        collegeName,
        track,

        fname1,
        dob1,
        selGen1,
        email1,
        mob1,
        git1,
        link1,
        twit1,
        face1,
        resume1,
        tShirt1,


        fname2,
        dob2,
        selGen2,
        email2,
        mob2,
        git2,
        link2,
        twit2,
        face2,
        resume2,
        tShirt2,

        fname3,
        dob3,
        selGen3,
        email3,
        mob3,
        git3,
        link3,
        twit3,
        face3,
        resume3,
        tShirt3,
        needs,
        heardFrom,
        firstTime,
        modeOfConduct,
        reason
    } = req.body;
    db.collection('users')
        .add({
            teamName,
            collegeName,
            track,
            members: [
                {
                    fname1,
                    dob1,
                    selGen1,
                    email1,
                    mob1,
                    git1,
                    link1,
                    twit1,
                    face1,
                    resume1,
                    tShirt1,
                },
                {
                    fname2,
                    dob2,
                    selGen2,
                    email2,
                    mob2,
                    git2,
                    link2,
                    twit2,
                    face2,
                    resume2,
                    tShirt2,
                },
                {
                    fname3,
                    dob3,
                    selGen3,
                    email3,
                    mob3,
                    git3,
                    link3,
                    twit3,
                    face3,
                    resume3,
                    tShirt3,
                },
            ],
            needs,
            heardFrom,
            firstTime,
            modeOfConduct,
            reason
        }).then(result => {
            // console.log("Successfully added");
            // console.log(result);
            res.set('Sec-Fetch-Site', 'same-origin');
            res.status(200).json({success: true});
        }).catch(err => {
            res.status(500).json({success: false, error: err});
        })

})

app.get('/registration', (req, res) => {
    res.render('form');
});













