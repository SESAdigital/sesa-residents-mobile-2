import Size from '@src/utils/useResponsiveSize';
import {
  ActiveCheckCircleIcon,
  InActiveCheckCircleIcon,
} from '../icons/custom';

interface Props {
  isChecked: boolean;
}

const AppCircularCheckIcon = ({ isChecked }: Props): React.JSX.Element => {
  return (
    <>
      {isChecked ? (
        <ActiveCheckCircleIcon
          height={Size.calcAverage(25)}
          width={Size.calcAverage(25)}
        />
      ) : (
        <InActiveCheckCircleIcon
          height={Size.calcAverage(25)}
          width={Size.calcAverage(25)}
        />
      )}
    </>
  );
};

export default AppCircularCheckIcon;
