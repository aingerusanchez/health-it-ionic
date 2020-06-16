# Health-It!
An application to mantain in good state the home fresh food.

<div>
<img src="https://github.com/Aingeru72/health-it-ionic/blob/master/images/light_mode.png" alt="Light Mode" title="Light Mode" width="300" height="600" align="left">
<img src="https://github.com/Aingeru72/health-it-ionic/blob/master/images/dark_mode.png" alt="Dark Mode" title="Dark Mode" width="300" height="600" align="right">
</div>

- [Health-It!](#health-it)
    - [Getting Started](#getting-started)
    - [Install](#install)

## Getting Started
1. Clone or download the repository.
2. Open the project in your favourite IDE.
3. Installa all packages: `npm install`
4. Deploy locally: `ionic serve` (to show in mobile emulator -in Google Chrome and Windows- `Ctrl+Shift+C` )

## Install
0. Sync last changes and compile with `npm run build` (under the hood runs `ionic build & npx cap sync`).
1. Open in each OS IDE, and run from it:
   1. Android Studio --> `npx cap open android`
   2. XCode (iOS) --> `npx cap open ios`

## Deploy

### Deploy Android 

1. Compile Android version: 
```
npm run build
```

2. Deploy apk with Firebase - App Distribution (from Android project directory, .apk container)
```
firebase appdistribution:distribute app-debug.apk --app 1:616486404273:android:1eee6a1349b3bf41eee290
```

3. Open browser and navigate to [Firebase App Distribution](https://console.firebase.google.com/u/0/project/health-it-bff04/appdistribution/app/android:com.aingerusanchez.healthit/releases)

4. Open just uploaded version and follow steps (add testers and version notes)

Alternatively, all process from step 2 can be done with ( [learn more](https://firebase.google.com/docs/app-distribution/android/distribute-cli) ):

```firebase appdistribution:distribute app-debug.apk  \
    --app 1:616486404273:android:1eee6a1349b3bf41eee290  \
    --release-notes "new version notes" --testers "aingerusanchez72@gmail.com"
```


### Deploy Web

0. Delete `www` directory if exist

1. Compile Android version: 
```
npm run build
```

2. Test version with:
```
firebase serve
``` 
(usually serves at [localhost:5000](http://localhost:5000/) )

3. If all it's OK, deploy with:
```
firebase deploy
```