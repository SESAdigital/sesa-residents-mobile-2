import { SelectInputData } from '@src/types/default';
import { ElectricityMeterTypeData } from './default';

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
