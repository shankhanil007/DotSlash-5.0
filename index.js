const express = require('express');
const hbs = require('hbs');
const admin = require('firebase-admin');
const compression = require('compression');
const serviceAccount = require('./serviceAccountKey.json');

const app = express();
const port = process.env.PORT || 5000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://dotslash4-8b10e.firebaseio.com',
});
let db = admin.firestore();

// compress all responses
app.use(compression());

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
});

app.get('/final', (req, res) => {
  res.render('final1');
});

app.get('/alumni', (req, res) => {
  res.render('alumni');
});

app.get('/coc', (req, res) => {
  res.render('coc');
});

// removes none entries from array
let matchString = (s1, s2, s3, s4, s5, s6) => {
  let strSet = new Set();
  let strArr = [s1, s2, s3, s4, s5, s6].filter((str) => {
    return str !== 'none';
  });
  strArr.forEach((str) => {
    strSet.add(str);
  });
  if (strSet.size === strArr.length) return false;
  else return true;
};

app.post('/api/users', async (req, res) => {
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
  } = req.body;
  let emailSent = false;
  let found = false;

  try {
    const docs = await db.collection('users').get();
    docs.forEach((doc) => {
      let docEmail1 = doc.data().members[0].email1;
      let docEmail2 = doc.data().members[1].email2;
      let docEmail3 = doc.data().members[2].email3;
      if (
        matchString(docEmail1, docEmail2, docEmail3, email1, email2, email3)
      ) {
        found = true;
      }
    });
    if (found) {
      res.status(503);
      throw new Error('Duplicate Email entry found');
    }
    const user = await db.collection('users').add({
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
      emailSent,
    });
    res.set('Sec-Fetch-Site', 'same-origin');
    res.status(200).json({ success: true });
  } catch (err) {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    // console.log(statusCode);
    res.status(statusCode).json({ success: false, error: err });
  }
});

// app.get('/registration', (req, res) => {
//   res.render('form');
// });

app.listen(port);
