// service firebase.storage {
//   match /b/angfileup.appspot.com/o {
//     match /{allPaths=**} {
//       allow read, write;
//     }
//   }
// }

angular.module("app", [])
	.config(() => (
	  firebase.initializeApp({
    apiKey: "AIzaSyBmlNlHiXzxgB8CGrF-drbqJIKEDP2L0AQ",
    authDomain: "angfileup.firebaseapp.com",
    databaseURL: "https://angfileup.firebaseio.com",
    storageBucket: "angfileup.appspot.com",
  })))
	.controller("UploadCtrl", function ($timeout, uploadFactory) {
		const up = this

		up.heading = "Share those files playa!"
		up.photoURLs = []

		up.submit = function () {
			const input = document.querySelector('[type="file"]')
			const file = input.files[0]
			// console.dir(input.file)
			const randomInteger = Math.random() * 1e17
			const getFileExtension = file.type.split("/").slice(-1)[0]
			const randomPath = `${randomInteger}.${getFileExtension}`
			// const uploadTask = firebase.storage().ref().child("funnypic1.jpg").put(file)

			 uploadFactory.send(file, randomPath)
        .then(res => {
          up.photoURLs.push(res.downloadURL)
          return res.downloadURL
        })
        .then((url) => {
          firebase.database().ref('/images').push({url})
        })
			// uploadTask.on('state_changed', null, null, () => {
			// 	up.photoURLs.push(uploadTask.snapshot.downloadURL)
			// 	$scope.$apply(
		}
	})
 .factory('uploadFactory', ($timeout) => ({
    send (file, path = file.name) {
      return $timeout().then(() => (
        new Promise ((resolve, reject) => {
          const uploadTask = firebase.storage().ref()
            .child(path).put(file)
// function uploadFile (file, path) {
// 	return new Promise ((resolve, reject) => {
// 		const uploadTask = firebase.storage().ref()
// 			.child(path).put(file)

					uploadTask.on("state_changed",
						null,
						reject,
						() => resolve(uploadTask.snapshot)
					)
				})
  		))
		}
}))

