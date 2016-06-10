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
	.controller("UploadCtrl", function () {
		const up = this

		up.heading = "Share those files playa!"
		up.photoURLs = []

		up.submit = function () {
			const input = document.querySelector('[type="file"]')
			const file = input.files[0]
			// console.dir(input.file)
			const uploadTask = firebase.storage().ref().child("funnypic1.jpg").put(file)

			uploadTask.on('state_changed', null, null, () => {
				up.photoURLs.push(uploadTask.snapshot.downloadURL)
				$scope.$apply()
			})
		}
	})

function uploadFile (file, path) {
	return new Promise (() {
		const uploadTask = firebase.storage().ref()
			.child(path).put(file)

			uploadTask.on("state_changed", null, reject, () => resolve(uploadTask.snapshot)
				)
	})
}

