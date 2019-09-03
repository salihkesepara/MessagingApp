import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyBcjIKSUEqueI6wWPPLyjQ1kOXZrqootuI',
  authDomain: 'messagesapp-32218.firebaseapp.com',
  databaseURL: 'https://messagesapp-32218.firebaseio.com',
  projectId: 'messagesapp-32218',
  storageBucket: 'messagesapp-32218.appspot.com',
  messagingSenderId: '112290416814',
  appId: '1:112290416814:web:2d85f63bd3e9b0ba',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
