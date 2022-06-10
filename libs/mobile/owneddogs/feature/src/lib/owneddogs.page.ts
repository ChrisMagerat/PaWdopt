import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {Apollo, gql } from 'apollo-angular';
import { LoginPageComponentModule } from '@pawdopt/mobile/login/feature';
@Component({
  selector: 'pawdopt-owneddogs',
  templateUrl: 'owneddogs.page.html',
  styleUrls: ['owneddogs.page.scss', '../../../../../shared/styles/global.scss'],
  providers: [Apollo, LoginPageComponentModule]

})
export class owneddogsPageComponent {

  //public static GlobalVars = "hello";
  
  inputSearch!: string;
  orgName = "";

  //get org name for login

  dog:{
    name:string,
    age: number,
    likes: number,
    pic:string,
    about:string
  }[]=[]


  // userLikes:{
  //   name:string,
  //   pic:string,
  // }[]=[];

  constructor(private router: Router, private apollo: Apollo){
    this.getDog();
   // this.orgName = LoginPageComponentModule.orgName;
    console.log(this.orgName);
  }

  getDog(){
    const getDogQuery = gql`query {
      findDogsByOrgName(orgName: "") {
        name
        dob
        pics{
          path
        }
        about
        usersLiked{
          name
        }
      }
    }`;

    this.apollo.watchQuery({
      query: getDogQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDogsByOrgName: {
          name: string,
          dob: Date,
          pics: {
          path: string
          }[],
          about: string,
          usersLiked: {
            name: string
          }[]
        }[]
      };
      
      // this.dog.name = data.findDog.name;
      // this.dog.pic = data.findDog.pics[0].path;
      // this.dog.about = data.findDog.about;
      // this.dog.age = 0;
      // this.dog.likes = data.findDog.usersLiked.length;
      // console.log(data);
      // console.log(data.findDogByOrgName);

      data.findDogsByOrgName.forEach(element => {
        this.dog.push(
          {
            name: element.name,
            pic: element.pics[0].path,
            age: 0,
            likes: element.usersLiked.length,
            about: element.about
          }
        );
      })  
    })
  }


  search(){
    const getDogQuery = gql`query {
      findDog(name: "${this.inputSearch}") {
        name
        dob
        pics{
          path
        }
        about
        usersLiked{
          name
        }
      }
    }`;

    this.apollo.watchQuery({
      query: getDogQuery,
      fetchPolicy: 'no-cache'
    }).valueChanges.subscribe((result) => {
      console.log(result);
      const data = result.data as {
        findDog: {
          name: string,
          dob: Date,
          pics: {
          path: string
          }[],
          about: string,
          usersLiked: {
            name: string
          }[]
        }  
      };

      if(data.findDog == null)
      {
        alert("Dog not found");
        this.dog = [];

      }
      else{
        this.dog=[];

        this.dog.push(
          {
            name: data.findDog.name,
            pic: data.findDog.pics[0].path,
            age: 0,
            likes: data.findDog.usersLiked.length,
            about: data.findDog.about
          }
        )
      }
    })
  }

  onCancelSearch(){
    this.dog=[];
    this.getDog();
  }

  dashboard(){
    this.router.navigate(["/dashboard"]);
  }

  update(){
    this.router.navigate(["/updateorremovedog"]);
  }

  addDog(){
    this.router.navigate(["/adddog"]);
  }
  
  home(){
    this.router.navigate(["/home"]);
  }

  likeddogs(){
    this.router.navigate(["/userlikes"]); 
    //Will need to change so that likeddogs alternates between company and user
  }

  profile(){
    this.router.navigate(["/userprofile"]);
  }

  preferences(){
    //this.router.navigate(["/userinfo"]); Not implemented yet
  }

  
}

