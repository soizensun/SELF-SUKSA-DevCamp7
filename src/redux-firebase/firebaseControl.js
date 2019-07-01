const firebase = require('firebase');
const config = require('./firebaseConfig');

const fire = firebase.initializeApp(config);
const db = fire.firestore();

const createQuiz = (quizID, type, tags, questionObjs) => {
  db.collection('User').doc('user3').set({
    name: 'Zen',
  }).then(() => {
    db.collection('User/user3/Quiz').doc(`${quizID}`).set({
      type: `${type}`,
      tags: {tags}
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

const getQuestionType = () => {
  const questionType = [];
  db.collection('QuestionType').onSnapshot((snapshot) => {
    snapshot.forEach(doc => {
      questionType.push({
        key: doc.id,
        values: doc.data().values
      })
    })
  });
  return questionType;
}

module.exports = { fire, getQuestionType};