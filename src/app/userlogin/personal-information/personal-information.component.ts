import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.component.html',
  styleUrls: ['./personal-information.component.css']
})
export class PersonalInformationComponent implements OnInit {
  DefaultImg='../../../assets/images/users/avatar.png';
  profileImage='';
  SelectedFile:File=null;
  urls = new Array<string>();
  constructor() { }

  ngOnInit() {
    this.profileImage=this.DefaultImg;
  }

  readURL(event) {
    
    this.urls = [];
    this.SelectedFile= <File>event.target.files[0];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
          reader.onload = (e: any) => {
          this.urls.push(e.target.result);
          this.profileImage=e.target.result;
        }
        reader.readAsDataURL(file);
        
      }
      if(this.urls.length==0){
        this.SelectedFile=null;
        this.profileImage=this.DefaultImg;
      }
    }
    else{
      this.profileImage=this.DefaultImg;
    }
  }

}
