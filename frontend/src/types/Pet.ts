export interface PetRegister {
  id: string;
  name: string;
  age: string;
  weight: string;
  color: string;
  images: File[];
}

export interface Pet {
  id: string;
  name: string;
  age: string;
  weight: string;
  color: string;
  available?: boolean;
  adoptedById?: string;
  user?: { phone: string; name: string };
  images: Image[];
}

export interface PetFormData {
  id: string;
  name: string;
  age: string;
  weight: string;
  color: string;
  adoptedById?: string;
  images: (Image | File)[];
}

type Image = {
  url: string;
};
