import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Path,
  Rect,
  SvgProps,
} from 'react-native-svg';

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
    <Defs />
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
    <Defs />
  </Svg>
);

export const InActiveCheckIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect
      width={20.8}
      height={20.8}
      x={0.6}
      y={0.6}
      stroke="#D9D9D9"
      strokeWidth={0.8}
      rx={4.4}
    />
    <G filter="url(#a)">
      <Rect width={20} height={20} x={1} y={1} fill="#FEFEFE" rx={4} />
    </G>
    <Rect
      width={19.2}
      height={19.2}
      x={1.4}
      y={1.4}
      stroke="#FEFEFE"
      strokeWidth={0.8}
      rx={3.6}
    />
    <Defs />
  </Svg>
);

export const ActiveCheckIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Rect
      width={20.8}
      height={20.8}
      x={0.6}
      y={0.6}
      stroke="#0660FE"
      strokeWidth={0.8}
      rx={4.4}
    />
    <G filter="url(#a)">
      <Rect width={20} height={20} x={1} y={1} fill="#0660FE" rx={4} />
    </G>
    <Rect
      width={19.2}
      height={19.2}
      x={1.4}
      y={1.4}
      stroke="#FEFEFE"
      strokeWidth={0.8}
      rx={3.6}
    />
    <G clipPath="url(#b)" filter="url(#c)">
      <Path
        fill="#FEFEFE"
        d="m9.666 13.115 6.128-6.129.944.943L9.666 15l-4.242-4.242.942-.943 3.3 3.3Z"
      />
    </G>
    <Defs>
      <ClipPath id="b">
        <Path fill="#fff" d="M3 3h16v16H3z" />
      </ClipPath>
    </Defs>
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

export function PaystackIcon({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 13 13">
      <Path
        d="M11.2533 0.5H1.12337C0.78051 0.5 0.5 0.785708 0.5 1.13492V2.27777C0.5 2.62699 0.78051 2.9127 1.12337 2.9127H11.2221C11.5649 2.9127 11.8455 2.62699 11.8455 2.27777V1.13492C11.8766 0.785708 11.5961 0.5 11.2533 0.5ZM11.2533 6.88095H1.12337C0.78051 6.88095 0.5 7.16666 0.5 7.51587V8.65872C0.5 9.00794 0.78051 9.29365 1.12337 9.29365H11.2221C11.5649 9.29365 11.8455 9.00794 11.8455 8.65872V7.51587C11.8766 7.16666 11.5961 6.88095 11.2533 6.88095ZM6.82727 10.0873H1.12337C0.78051 10.0873 0.5 10.373 0.5 10.7222V11.8651C0.5 12.2143 0.78051 12.5 1.12337 12.5H6.82727C7.17014 12.5 7.45065 12.2143 7.45065 11.8651V10.7222C7.45065 10.373 7.17014 10.0873 6.82727 10.0873ZM11.8766 3.70635H1.12337C0.78051 3.70635 0.5 3.99206 0.5 4.34126V5.48413C0.5 5.83332 0.78051 6.11905 1.12337 6.11905H11.8766C12.2195 6.11905 12.5 5.83332 12.5 5.48413V4.34126C12.5 3.99206 12.2195 3.70635 11.8766 3.70635Z"
        fill={color}
      />
    </Svg>
  );
}

export function CustomShareIcon(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 12 16" {...props}>
      <Path
        d="M1.339 16c-.382 0-.7-.128-.956-.383A1.297 1.297 0 010 14.66V6.566c0-.382.128-.7.383-.956.256-.255.574-.383.956-.383h1.753v.829H1.339a.487.487 0 00-.35.16.487.487 0 00-.16.35v8.095c0 .128.053.245.16.351.105.106.222.16.35.16h8.924a.487.487 0 00.35-.16.488.488 0 00.16-.35V6.565a.487.487 0 00-.16-.35.487.487 0 00-.35-.16H8.51v-.829h1.753c.381 0 .7.128.956.383.255.256.383.574.383.956v8.095c0 .382-.128.7-.383.956a1.297 1.297 0 01-.956.383H1.339zm4.047-5.386V1.591l-1.74 1.74-.586-.591L5.8 0l2.742 2.741-.587.591-1.74-1.74v9.021h-.829z"
        fill="currentColor"
      />
    </Svg>
  );
}
