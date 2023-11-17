<a href="https://dudynets.pp.ua">
  <img src="https://user-images.githubusercontent.com/39008921/191470114-c074b17f-1c88-4af3-b089-1b14418cabf5.png" alt="drawing" width="128"/>
</a>

# Angular Image Hosting

<p><strong>Image hosting app built with Angular and Firebase.</strong></p>

> Developed by [Oleksandr Dudynets](https://dudynets.dev)

## Run Steps

1. Clone the repository.
```sh
git clone https://github.com/dudynets/Angular-Image-Hosting
```
2. Install NPM packages (requires Yarn Package Manager installed).
```sh
yarn install
```
3. Create a new Firebase project in the [Firebase console](https://console.firebase.google.com/).
   1. Enable the Authentication service in the Firebase console and add a Google authentication provider.
   2. Enable the Firestore database in the Firebase console.
   3. Enable the Cloud Storage service in the Firebase console.
   4. Enable the Firebase Hosting service in the Firebase console.
4. Add a new web app to the project in the Firebase console.
   1. Create a `config.ts` file in the root directory of the project and copy the contents of the `config.example.ts` file into it (you can also rename the `config.example.ts` file to `config.ts`).
   2. Copy the Firebase config from the Firebase console into the `config.ts` file.
5. Create a [Syncfusion account](https://www.syncfusion.com/) and get a free Community license key or a free trial license key.
   1. Copy the Syncfusion license key into the `config.ts` file.
5. Install Angular CLI and Firebase CLI.
```sh
npm install -g @angular/cli firebase-tools
```
6. Login to Firebase.
```sh
firebase login
```
7. Choose a Firebase project to use.
```sh
firebase use [YOUR_PROJECT_ID]
```
9. Run the app in development mode.
```sh
yarn start
```
10. Open the app in a browser at http://localhost:4200, login with Google and create a new user.

## Deployment Steps

1. Complete all steps from the [Run Steps](#run-steps) section.
2. Run the deployment script.
```sh
yarn firebase:deploy
```
3. You should see the app URL in the console output.

## Notes

- Make sure you have the latest stable version of Node.js installed (tested with Node.js v18.18.0).
- At the time of writing, Syncfusion provides a free Community license key for non-commercial use and a free trial license key. This may change in the future.
- This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.5.

## License

Distributed under the [MIT](https://choosealicense.com/licenses/mit/) License.
See [LICENSE](https://github.com/dudynets/Angular-Image-Hosting/blob/main/LICENSE) for more information.
