import { Component } from '@angular/core';
import * as firebase from 'firebase'
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { FormularioComponent } from '../formulario/formulario.component';
import { Network } from '@ionic-native/network/ngx';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ref = firebase.database().ref()
  personas : any []
  


  constructor(
    private alertController : AlertController,
    private modal: ModalController,
    private network: Network,
    public toastController: ToastController
  ){
    let connectSubscription = this.network.onConnect().subscribe(() => {
      console.log('network connected111111!');
      setTimeout(() => {
        if (this.network.type === 'wifi') {
          if(localStorage.getItem('personas')){
            let sincronizacion = JSON.parse(localStorage.getItem('personas'))
            JSON.parse(localStorage.getItem('personas')).forEach(item => {
              let insert = this.ref.push();
              console.log(insert.set(item))
            });
            this.presentToast()
            localStorage.clear()
          }
        }
      }, 3000);
    });
    //connectSubscription.unsubscribe();
  }

  async abrirFormulario(){
    const modal= await this.modal.create({
      component: FormularioComponent,
      cssClass: 'formulario'
    });
    await modal.present();
    const anotherModal = modal.onWillDismiss().then(()=>{
    })
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Se han sincronizado los datos.',
      duration: 2000
    });
    toast.present();
  }

  
}
