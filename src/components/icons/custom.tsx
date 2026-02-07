import Svg, { Circle, Defs, G, Path, Rect, SvgProps } from 'react-native-svg';

import colors from '@src/configs/colors';

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

export const ActiveCheckCircleIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect
      width={20.8}
      height={20.8}
      x={0.6}
      y={0.6}
      stroke="#0660FE"
      strokeWidth={0.8}
      rx={10.4}
    />
    <G filter="url(#a)">
      <Rect width={20} height={20} x={1} y={1} fill="#0660FE" rx={10} />
    </G>
    <Rect
      width={19.2}
      height={19.2}
      x={1.4}
      y={1.4}
      stroke="#FEFEFE"
      strokeWidth={0.8}
      rx={9.6}
    />
    <G filter="url(#b)">
      <Circle cx={11} cy={11} r={3} fill="#FEFEFE" />
    </G>
    <Defs></Defs>
  </Svg>
);

export const InActiveCheckCircleIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect
      width={20.8}
      height={20.8}
      x={0.6}
      y={0.6}
      stroke={colors.LIGHT_GRAY_100}
      strokeWidth={1.9}
      rx={10.4}
    />
    <G filter="url(#a)">
      <Rect width={20} height={20} x={1} y={1} fill="#FEFEFE" rx={10} />
    </G>
    <Rect
      width={19.2}
      height={19.2}
      x={1.4}
      y={1.4}
      stroke="#FEFEFE"
      strokeWidth={0.8}
      rx={9.6}
    />
    <Defs></Defs>
  </Svg>
);

export function EmptyIcon() {
  return <></>;
}

export const EmptyTableIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill="#EDEEEF"
      d="M8.97 35.744C.02 25.946.342 7.07.346 6.882L31.36 6.87c.008.202-.315 19.067 8.62 28.853l.02.02H8.97Z"
      opacity={0.6}
    />
    <Path
      fill="#CBCBCB"
      d="M8.626 29.415C-.325 19.616-.002.742.002.553L31.017.541c.008.202-.315 19.066 8.62 28.853l.019.02H8.626Z"
    />
    <Path
      stroke="#595959"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M12.286 11.102h10.592M14.611 18.854h6.933"
    />
  </Svg>
);
