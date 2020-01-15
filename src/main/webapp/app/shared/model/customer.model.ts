export const enum Gender {
  OTHER = 'OTHER',
  MALE = 'MALE',
  FEMALE = 'FEMALE'
}

export const enum EducationalQualification {
  UNKNOWN0 = 'UNKNOWN0',
  GRADUATE_SCHOOL = 'GRADUATE_SCHOOL',
  UNIVERSITY = 'UNIVERSITY',
  HIGH_SCHOOL = 'HIGH_SCHOOL',
  OTHERS = 'OTHERS',
  UNKNOWN = 'UNKNOWN',
  UNKNOWN2 = 'UNKNOWN2'
}

export const enum MaritalStatus {
  UNKNOWN = 'UNKNOWN',
  MARRIED = 'MARRIED',
  SINGLE = 'SINGLE',
  OTHERS = 'OTHERS'
}

export interface ICustomer {
  id?: string;
  customerId?: number;
  name?: string;
  limitBalance?: number;
  sex?: Gender;
  education?: EducationalQualification;
  marriage?: MaritalStatus;
  age?: number;
  creditHistory?: string;
  isDefaulter?: boolean;
}

export const defaultValue: Readonly<ICustomer> = {
  isDefaulter: false
};
