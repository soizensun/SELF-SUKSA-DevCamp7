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
      tags: {tags},
      topic: `${topic}`,
      detail: `${detail}`,
      timeStamp: new Date().toISOString()
    }).then(() => {
      console.log(questionObjs);
      questionObjs.map((questionObj, index) => {
        db.collection(`${docRefQuiz.path}/Questions`).doc(`${index}`).set(
          { questionObj }
        ).then(() => {
          console.log('Created');
        })
      })
    })
  })
}

module.exports = { fire, createQuiz };