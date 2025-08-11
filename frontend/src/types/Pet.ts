export interface Pet {
  id: string;
  name: string;
  age: string;
  weight: string;
  color: string;
  images: File[];
}

export interface PetUser {
  id: string;
  name: string;
  age: string;
  weight: string;
  color: string;
  available?: boolean;
  adoptedById?: string;
  images: Image[];
}

type Image = {
  url: string;
};
