import { Component, OnInit } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser/ngx';
import { Base64 } from '@ionic-native/base64/ngx';
import { AlertController } from '@ionic/angular';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-upload-vedio',
  templateUrl: './upload-vedio.page.html',
  styleUrls: ['./upload-vedio.page.scss'],
})
export class UploadVedioPage implements OnInit {

  constructor(
    private storage: Storage,
    private file: File,
    private fileChooser: FileChooser,
    private filePath: FilePath,
    private base64: Base64,
    public alertController: AlertController
  ) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Subtitle',
      message: 'This is an alert message.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Chose file',
          handler: () => {
            console.log('Confirm Ok');
            this.fileChoose();
          }
        }
      ]
    });

    await alert.present();
  }


  fileChoose() {
    // choose your file from the device
    this.fileChooser.open().then(uri => {
      // get file path
      this.filePath.resolveNativePath(uri)
        .then(file => {
          let filePath: string = file;
          if (filePath) {
            // convert your file in base64 format
                console.log(filePath,"chitranjan");
                // this.convertVideoToBase64()
                let pathArr=[]
                pathArr.push(filePath);
                this.storage.set("path",pathArr)
                alert("chitranjan");
          }
        })
        .catch(err => console.log(err));
    })
      .catch(e => alert('uri' + JSON.stringify(e)));
  }


    convertVideoToBase64() {
      this.storage.get("path").then(data =>{
        console.log(data,"pathData")
        for (let i = 0; i < data.length; i++) {
           this.file
            .resolveLocalFilesystemUrl(data[i])
            .then((entry: any) => {
              entry
                .file(resFile => {
                  let reader = new FileReader();
                  reader.readAsDataURL(resFile);
                  reader.onloadend = async (evt: any) => {
                    let OriginalBase64 = evt.target.result.split(",")[1]; // Remove the "data:video..." string.
                    let encodingType = evt.target.result.split(",")[0]; // Remove the "data:video..." string.
                    let decodedBase64 = atob(OriginalBase64); // Decode the incorrectly encoded base64 string.
                    let encodedBase64 = btoa(decodedBase64); // re-encode the base64 string (correctly).
                    let newBase64 = encodingType + encodedBase64; // Add the encodingType to the string.
                    console.log(newBase64,"chittti");
                    let pathArr=[]
                  pathArr.push(newBase64);
                  console.log(pathArr,"pathArr")
                 };
                }).then(()=>{
                 
                })
                .catch(error => {
                  console.log(error);
                });
            })
            .catch(error => {
              console.log(error);
            });
        }
        });

    }


    // this.base64.encodeFile(filePath).then((base64File: string) => {
    //   console.log(base64File,"b64Chitrajan");
    // }, (err) => {
    //   console.log(err);
    // });
  }

  // chooseFile(){
  //   this.fileChooser.open()
  // .then(uri =>{
  //   console.log(uri,"chitranjan");
  //   this.convertVideoToBase64(uri)
  // } )
  // .catch(e => console.log(e));
  // }



