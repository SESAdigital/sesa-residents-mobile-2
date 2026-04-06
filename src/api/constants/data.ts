import { SelectInputData } from '@src/types/default';
import {
  ElectricityMeterTypeData,
  GenderTypeData,
  KYCVerificationTypeData,
  PropertyCategoryData,
  PropertyCategoryType,
  RelationshipTypeData,
  RepeatDaysTypeData,
} from './default';

export const ALL_METER_TYPES: SelectInputData[] = [
  {
    title: 'Postpaid Meter',
    value: ElectricityMeterTypeData?.PostPaid?.toString(),
  },
  {
    title: 'Prepaid Meter',
    value: ElectricityMeterTypeData?.PrePaid?.toString(),
  },
];

export const ALL_GENDER_TYPES: SelectInputData[] = [
  {
    title: 'Male',
    value: GenderTypeData?.Male?.toString(),
  },
  {
    title: 'Female',
    value: GenderTypeData?.Female?.toString(),
  },
];

export const ALL_RELATIONSHIP_TYPES: SelectInputData[] = [
  {
    title: 'Father',
    value: RelationshipTypeData?.Father?.toString(),
  },
  {
    title: 'Mother',
    value: RelationshipTypeData?.Mother?.toString(),
  },
  {
    title: 'Brother',
    value: RelationshipTypeData?.Brother?.toString(),
  },
  {
    title: 'Sister',
    value: RelationshipTypeData?.Sister?.toString(),
  },
  {
    title: 'Son',
    value: RelationshipTypeData?.Son?.toString(),
  },
  {
    title: 'Daughter',
    value: RelationshipTypeData?.Daughter?.toString(),
  },
];

export const ALL_DAYS = [
  RepeatDaysTypeData.SUN,
  RepeatDaysTypeData.MON,
  RepeatDaysTypeData.TUE,
  RepeatDaysTypeData.WED,
  RepeatDaysTypeData.THU,
  RepeatDaysTypeData.FRI,
  RepeatDaysTypeData.SAT,
];

export const mapPropertyCategoryTypeToShortCharacter = (
  val: PropertyCategoryType,
) => {
  if (val === PropertyCategoryData.Commercial) {
    return 'C';
  }
  if (val === PropertyCategoryData.Residential) {
    return 'R';
  }
  if (val === PropertyCategoryData.Shortlet) {
    return 'S';
  }
  return 'U';
};

export const ID_TYPES: SelectInputData[] = [
  {
    title: 'Bank Verification Number ( BVN )',
    value: KYCVerificationTypeData.BVN?.toString(),
  },
  {
    title: "Driver's License",
    value: KYCVerificationTypeData.DriversLicense?.toString(),
  },
  {
    title: 'International Passport',
    value: KYCVerificationTypeData.IntlPassport?.toString(),
  },
  {
    title: 'National Identification Number ( NIN )',
    value: KYCVerificationTypeData.NIN?.toString(),
  },
  {
    title: 'Phone Number',
    value: KYCVerificationTypeData.PhoneNumber?.toString(),
  },
  {
    title: 'Virtual National Identification Number ( VNIN )',
    value: KYCVerificationTypeData.VNIN?.toString(),
  },
  {
    title: "Voter's Card",
    value: KYCVerificationTypeData.VotersCard?.toString(),
  },
];

export const STATES: SelectInputData[] = [
  'Abia',
  'Adamawa',
  'Akwa Ibom',
  'Anambra',
  'Bauchi',
  'Bayelsa',
  'Benue',
  'Borno',
  'Cross River',
  'Delta',
  'Ebonyi',
  'Edo',
  'Ekiti',
  'Enugu',
  'FCT - Abuja',
  'Gombe',
  'Imo',
  'Jigawa',
  'Kaduna',
  'Kano',
  'Katsina',
  'Kebbi',
  'Kogi',
  'Kwara',
  'Lagos',
  'Nasarawa',
  'Niger',
  'Ogun',
  'Ondo',
  'Osun',
  'Oyo',
  'Plateau',
  'Rivers',
  'Sokoto',
  'Taraba',
  'Yobe',
  'Zamfara',
].map(key => ({
  title: key,
  value: key,
}));

export const WORK_DAYS = ['Mon', 'Tues', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
