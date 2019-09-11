import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-camera-test',
  templateUrl: './camera-test.page.html',
  styleUrls: ['./camera-test.page.scss'],
})
export class CameraTestPage implements OnInit {

  public imgData: string;

  public gallery: string[] = [];

  constructor(private camera: Camera, private storage: Storage) {
    // Pour réupérer les données enregistrées
    storage.get('images').then (
      (data) => this.gallery = data || []
    );
  }

  ngOnInit() {
  }

  public takePicture() {
    const options: CameraOptions = {
      quality: 80,
      targetWidth: 500,
      targetHeight: 500,
      destinationType: this.camera.DestinationType.DATA_URL // DATA_URL retourne une chaine de caractère
    };

    this.camera.getPicture(options)
    .then( (pictureData) => {
      this.imgData = 'data: image/jpeg;base64,' + pictureData;
      this.gallery.push(this.imgData);
      // Pour l'enregistrement dan s le storage PERSISTANCE DE DONNEES
      this.storage.set('images', this.gallery)
      .then(() => console.log('galerie enregistrée'));
      })
    .catch( (err) => console.log(err) )
    .finally( () => console.log('Vous avez cliqué, merci!'));
  }

  public showPicture(index) {
    this.imgData = this.gallery[index];
  }
}
