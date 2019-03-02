import { Component, OnInit } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import * as firebase from 'firebase'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss'],
})
export class FormularioComponent implements OnInit {
  ref = firebase.database().ref()
  arregloDatos = []
  formulario: FormGroup;
  constructor(private formBuilder : FormBuilder,
    private modal : ModalController, 
    private network: Network,
    public toastController: ToastController) { 
  }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      'nombre' : ['',Validators.required],
      'edad' : ['',Validators.required],
      'sexo' : ['',Validators.required],
      'ocupacion':['',Validators.required],
      'ciudad' : ['',Validators.required],
    });
      
  }

  crearPersona(){
    if (this.network.type === 'wifi') {
      let insert = this.ref.push();
      insert.set(this.formulario.value);
      this.modal.dismiss();
      }
    else{
      if(localStorage.getItem('personas')){
        this.arregloDatos=(JSON.parse(localStorage.getItem('personas')))
      }
      this.arregloDatos.push(this.formulario.value)
      localStorage.setItem('personas',JSON.stringify(this.arregloDatos))
      this.presentToast()
      this.modal.dismiss()
    }
    
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Datos pendientes por sincronizar.',
      duration: 2000
    });
    toast.present();
  }


}

