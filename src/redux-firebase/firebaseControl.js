const firebase = require('firebase');
const config = require('./firebaseConfig');

const fire = firebase.initializeApp(config);
const db = fire.firestore();

const createQuiz = (topic, detail, type, tags, questionObjs) => {
  db.collection('User').doc('user3').set({
    name: 'Zen',
  }).then(() => {
    const docRefQuiz = db.collection('User/user3/Quiz').doc();
    docRefQuiz.set({
      type: `${type}`,
      tags: tags,
      topic: `${topic}`,
      detail: `${detail}`,
      timeStamp: new Date().toLocaleString()
    }).then(() => {
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
  })
}

module.exports = { fire, createQuiz };