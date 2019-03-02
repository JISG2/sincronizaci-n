import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase'


var config = {
  apiKey: "AIzaSyA2He7jWot3Hj2AYmc8OCQV3eo8Pyck2vI",
  authDomain: "datosoffline-89868.firebaseapp.com",
  databaseURL: "https://datosoffline-89868.firebaseio.com",
  projectId: "datosoffline-89868",
  storageBucket: "datosoffline-89868.appspot.com",
  messagingSenderId: "43354577254"
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config)
  }
}
