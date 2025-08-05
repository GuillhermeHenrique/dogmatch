export interface UserRegister {
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmpassword: string;
}

export interface UserLogin {
  email: string;
  password: string;
}
