const firebase = require('firebase');
const config = require('./firebaseConfig');

const fire = firebase.initializeApp(config);
const db = fire.firestore();

const createQuiz = (topic, detail, type, tags, questionObjs) => {
    const docRefQuiz = db.collection('Quizs').doc();
    docRefQuiz.set({
      type: `${type}`,
      tags: tags,
      topic: `${topic}`,
      detail: `${detail}`,
      timeStamp: new Date().toLocaleString()
    }).then(() => {
      console.log(docRefQuiz.path);
      
      questionObjs.map((questionObj, index) => {
        db.collection(`${docRefQuiz.path}/Questions`).doc(`${index}`).set({  
          question: questionObj.question,
          choices: questionObj.choices,
          reasons: questionObj.reasons,
          correctChoice: questionObj.correctChoice
        }).then(() => {
          console.log('Created!! -> ', questionObjs);
        })
      })
    })
}
const createAccount = (username, email, uid) => {
  db.collection('Users').doc(`${uid}`).set({
    username: username,
    email: email,
  })
}

module.exports = { fire, createQuiz, createAccount };