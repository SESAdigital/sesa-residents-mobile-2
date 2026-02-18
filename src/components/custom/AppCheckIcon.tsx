import Size from '@src/utils/useResponsiveSize';
import { ActiveCheckIcon, InActiveCheckIcon } from '../icons/custom';

interface Props {
  isChecked: boolean;
}

const AppCheckIcon = ({ isChecked }: Props): React.ReactNode => {
  return (
    <>
      {isChecked ? (
        <ActiveCheckIcon
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          // style={{backgroundColor: 'red'}}
        />
      ) : (
        <InActiveCheckIcon
          height={Size.calcAverage(24)}
          width={Size.calcAverage(24)}
          // style={{backgroundColor: 'red'}}
        />
      )}
    </>
  );
};

export default AppCheckIcon;
