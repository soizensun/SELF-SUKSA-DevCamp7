const firebase = require('firebase');
const config = require('./firebaseConfig');

const fire = firebase.initializeApp(config);
const db = fire.firestore();

const createQuiz = (topic, detail, type, tags, user, questionObjs) => {
  var tempArr = [];
  db.collection('Users').doc(`${user.uid}`).get().then((doc)=>{
    tempArr = doc.data().createdQuizzes;
    console.log(tempArr);
    
    const docRefQuiz = db.collection('Quizs').doc();
    docRefQuiz.set({
      type: `${type}`,
      tags: tags,
      topic: `${topic}`,
      detail: `${detail}`,
      authorName: doc.data().username,
      authorId: user.uid,
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
      tempArr.push(docRefQuiz.id);
      db.collection('Users').doc(`${user.uid}`).update({
        createdQuizzes: tempArr
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
const pushQuizToAlreadyDone = (userId, quizId) => {
  const docRefUser = db.collection('Users').doc(`${userId}`)
  docRefUser.get().then((doc)=>{
    let arr = doc.data().alreadyDoneQuizzes;
    arr.push(quizId);
    docRefUser.update({
      alreadyDoneQuizzes: arr
    })
  })
}

module.exports = { fire, createQuiz, createAccount };