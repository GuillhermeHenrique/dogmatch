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

export interface User {
  id: string;
  name: string;
  email: string;
  phone: number;
  password: string;
  confirmpassword: string;
  image?: File | string;
}
