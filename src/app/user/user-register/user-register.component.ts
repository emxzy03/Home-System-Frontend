import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators ,ValidatorFn, AbstractControl,FormBuilder } from '@angular/forms';
import { User } from 'src/app/Interface/User';
import { UserService } from 'src/app/services/user-service';


@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit{
  registerationForm!: FormGroup;
  user!: User;
  userSubmited: boolean = false;
  constructor(private fb: FormBuilder,private userService: UserService){

  }
  ngOnInit() {
    // this.registerationForm = new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null, [Validators.required, Validators.email]),
    //   password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
    //   confirmPassword: new FormControl(null, [Validators.required, this.passwordMatchingValidatior]),
    //   mobile: new FormControl(null, [Validators.required, Validators.maxLength(9)])
    // });
    // this.registerationForm.controls['userName'].setValue('Default Value')
    
    this.createRegisterationForm();
    this.registerationForm.controls['userName'].setValue('Default Value');
    this.registerationForm.controls['email'].setValue('example@example.com');
  }

  createRegisterationForm(){
    this.registerationForm = this.fb.group({
      userName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password:[null, [Validators.required, Validators.minLength(8)]],
      confirmPassword: [null, [Validators.required, this.passwordMatchingValidatior]],
      mobile: [null,[Validators.required, Validators.maxLength(10)]]
    },{validators:this.passwordMatchingValidatior })
  }

  passwordMatchingValidatior(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const password = this.registerationForm.get('password')!.value;
      const confirmPassword = control.value;
      return password === confirmPassword ? null : { passwordNotMatched: true };
    };
  }
  
  userData():User{
    return this.user = {
      userName: this.userName.value,
      email: this.email.value,
      password: this.password.value,
      mobile: this.mobile.value
    }
  }
  // ------------------------------------
  // Getter methods for all form controls
  // ------------------------------------
  get userName() {
    return this.registerationForm.get('userName') as FormControl;
  }

  get email() {
    return this.registerationForm.get('email') as FormControl;
  }
  get password() {
    return this.registerationForm.get('password') as FormControl;
  }
  get confirmPassword() {
    return this.registerationForm.get('confirmPassword') as FormControl;
  }
  get mobile() {
    return this.registerationForm.get('mobile') as FormControl;
  }
  // ------------------------

  onSubmit() {
    console.log(this.registerationForm.value); 
    this.userSubmited = true;
    if(this.registerationForm.valid){
    // this.user = Object.assign(this.user, this.registerationForm.value);
    this.userService.addUser(this.userData());
    this.registerationForm.reset();
    this.userSubmited = false;
    
  }
  }

 
}
