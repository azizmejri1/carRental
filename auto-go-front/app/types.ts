export type Filter = {
    model: string[];
    brand: string[];
    pricePerDay: [number, number];
    company: string[];
  };
  export interface Profile {
    id: number;
    name: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }
  
  export interface ProfileCardProps {
    user: Profile | null;
    activated: boolean;
    onUpdate: (updatedUser: Profile) => void;
  }
  
  export interface EditProfileModalProps {
    user: Profile;
    isOpen: boolean;
    onClose: () => void;
    onUpdate: (updatedUser: Profile) => void;
  }
  
  export interface ChangePasswordModalProps {
    userId: number;
    isOpen: boolean;
    onClose: () => void;
  }
  
  export interface ProfileInfoProps {
    user: Profile;
    activated: boolean;
    onEditClick: () => void;
    onChangePasswordClick: () => void;
  }