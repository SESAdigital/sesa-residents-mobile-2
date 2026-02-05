import Svg, { Path, Rect, SvgProps } from 'react-native-svg';

export const MailSuccessIcon = (props: SvgProps) => (
  <Svg width="1em" height="1em" fill="none" {...props}>
    <Rect
      width={props?.width}
      height={props?.height}
      fill="#F1F2F3"
      rx={72.5}
    />
    <Path
      fill="#00C593"
      d="M46.199 44.825h52.599c3.59 0 7.034 1.423 9.579 3.958a13.582 13.582 0 0 1 3.991 9.565v28.257a13.573 13.573 0 0 1-13.523 13.57H46.199a13.574 13.574 0 0 1-13.57-13.523V58.395a13.57 13.57 0 0 1 1.027-5.196 13.585 13.585 0 0 1 2.941-4.406 13.587 13.587 0 0 1 4.406-2.94 13.578 13.578 0 0 1 5.196-1.028Z"
    />
    <Path
      stroke="#2D2D2D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      d="M108.173 96.166 72.501 67.674 36.828 96.166"
    />
    <Path
      fill="#000"
      d="m72.454 88.752 35.672-40.198H36.828l35.626 40.198Z"
      opacity={0.3}
    />
    <Path
      fill="#00C593"
      d="m72.454 77.046 35.672-28.492a13.671 13.671 0 0 0-9.373-3.729H46.2a13.765 13.765 0 0 0-9.373 3.73l35.626 28.491Z"
    />
    <Path
      stroke="#2D2D2D"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      d="m36.828 48.554 35.626 28.492 35.672-28.492"
    />
  </Svg>
);

export function EmptyIcon() {
  return <></>;
}
