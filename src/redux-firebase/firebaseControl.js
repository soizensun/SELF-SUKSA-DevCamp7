const firebase = require('firebase');
const config = require('./firebaseConfig');

const fire = firebase.initializeApp(config);
const db = fire.firestore();

const createQuiz = (topic, detail, type, tags, questionObjs) => {
  db.collection('User').doc('user3').set({
    name: 'Zen',
  }).then(() => {
    db.collection('User/user3/Quiz').doc().set({
      type: `${type}`,
      tags: {tags},
      topic: `${topic}`,
      detail: `${detail}`
    }).then(() => {
      questionObjs.map((questionObj, index) => {
        db.collection(`User/user3/Quiz/${quizID}/Questions`).doc(`${index}`).set(
          { questionObj }
        ).then(() => {
          console.log('Created');
        })
      })
    })
  })
}

module.exports = { fire };