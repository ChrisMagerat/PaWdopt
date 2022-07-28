import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import {Apollo, gql } from 'apollo-angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'pawdopt-adddog',
  templateUrl: 'adddog.page.html',
  styleUrls: ['adddog.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo],
})
export class AdddogPageComponent {
  constructor(private router: Router, public actionSheetController: ActionSheetController, private apollo : Apollo, private afAuth: AngularFireAuth) {}


  inputName!: string;
  inputBreed!: string;
  inputGender!: string;
  inputDOB!: Date;
  inputAbout!: string;
  inputHeight!: number;
  inputWeight!: number;
  inputFurlength!: string;
  inputTemperament!: string;

  orgId!: string;
  uid?: string;

  addDog(){
    this.afAuth.currentUser.then(user => {
      this.uid = user?.uid;
      console.log(this.uid);

      if(this.uid){
        //Query used to get the orgId
        const findOrgMemberByIdQuery = gql`query {
          findOrgMemberById(_id: "${this.uid}") {
            organisation 
          }
        }`;
  
        this.apollo.watchQuery({
          query: findOrgMemberByIdQuery,
          fetchPolicy: 'no-cache'
        }).valueChanges.subscribe((result) => {
          const data = result.data as {
            findOrgMemberById: {
              organisation: string;
            };
          };
          if (data.findOrgMemberById != null) {
            const orgId = data.findOrgMemberById.organisation;
            this.orgId = orgId;
            console.log(this.orgId);
          }
          const AddDogMutation = gql`mutation {
            createDog(dog: {
              _id: "new_id",
              name: "${this.inputName}",
              dob: "${this.inputDOB}",
              gender: "${this.inputGender}",
              pics : ["firebaseID"],
              breed: "${this.inputBreed}",
              about: "${this.inputAbout}",
              weight: ${this.inputWeight},
              height: ${this.inputHeight},
              furLength: "${this.inputFurlength}",
              temperament: "${this.inputTemperament}"}, orgId:"${this.orgId}") {
                name
              }
            }`;

              console.log(AddDogMutation);
    
          this.apollo.mutate({
            mutation: AddDogMutation,
            fetchPolicy: 'no-cache'
            }).subscribe((result) => {
              console.log(result);
            }
          );
        });
        // pass it through to the mutation query
      }else{
        console.log("User not logged in");
      }
      this.router.navigate(["/owneddogs"]);
    });

    
  }
  Back(){
    // TODO Complete add dog validation
    this.router.navigate(["/owneddogs"]);
  }

  home(){
    this.router.navigate(["/owneddogs"]);
  }

  likeddogs(){
    this.router.navigate(["/adoptionprocess"]);
  }

  profile(){
    this.router.navigate(["/orgprofile"]);
  }

  preferences(){
    //this.router.navigate(["/orgsettings"]); Not implemented yet
  }

  
  async uploadPic(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Upload picture',
      buttons: [{
        text: 'Take picture using your camera',
        icon: 'camera-outline',
        handler: () => {
          console.log('Take picture clicked');
        }
      }, {
        text: 'Choose a picture from your gallery',
        icon: 'image-outline',
        handler: () => {
          console.log('Choose a picture clicked');
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }
}
