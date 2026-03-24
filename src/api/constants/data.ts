import { SelectInputData } from '@src/types/default';
import {
  ElectricityMeterTypeData,
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
