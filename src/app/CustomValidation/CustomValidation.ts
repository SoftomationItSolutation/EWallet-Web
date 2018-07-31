import { FormGroup, FormControl, FormGroupDirective, NgForm, ValidatorFn } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material';

export const regExps: { [key: string]: RegExp } = {
    Password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\.*])(?=.{6,})/,
    LoginId: /^([a-zA-Z0-9_-]){6,}$/,
    MobileNo: /^([0|\+[0-9]{1,5})?([7-9][0-9]{9})$/,
    OTP:/^[0-9]{6,}$/,
    EmailId: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    RewardCode: /^([a-zA-Z0-9_-]){8,8}$/,
    RewardAmount:/^(\d{1,5}|\d{1,5}\.\d{0,2})$/,
    RewardDays:/^(\d{1,2}|\d{1,2})$/,
    Amount:/^(\d{1,5}|\d{1,5}\.\d{0,2})$/,
    PromoCode: /^([a-zA-Z0-9_-]){8,8}$/,
 };

 export class ConfirmValidParentMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
        return control.parent.invalid && control.touched;
    }
}

export const errorMessages: { [key: string]: string } = {
    fullName: 'Full name must be between 1 and 128 characters',
    EmailId: 'Email must be a valid email address (username@domain)',
    confirmEmail: 'Email addresses must match',
    Password: 'Password must be must be 6 characters or longer, contain at least 1 special 1 lowercase  1 uppercase & 1 numeric.',
    confirmPassword: 'Passwords must match',
    MobileNo: 'Please enter valid mobile number',
    OTP:'OTP must be 6 numeric characters',
    LoginId: 'Login id must be must be 6 characters or longer, contain alpha or numeric.',
    RewardCode: 'Enter a valid code.',
    RewardAmount:'Enter a valid amount.',
    RewardDays:'Enter a valid days.',
    Amount:'Enter a valid amount.',
    PromoCode: 'Enter a valid promo code.',
};