import Svg, {
  Circle,
  ClipPath,
  Defs,
  G,
  Mask,
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

export function SESAHomeIcon(props: SvgProps) {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" {...props}>
      <Mask
        id="a"
        style={{
          maskType: 'luminance',
        }}
        maskUnits="userSpaceOnUse"
        x={0}
        y={0}
        width={20}
        height={20}
      >
        <Path d="M0 0h20v20H0V0z" fill="#fff" />
      </Mask>
      <G mask="url(#a)">
        <Mask
          id="b"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={2}
          y={2}
          width={17}
          height={17}
        >
          <Path d="M2.031 2.001H18.28v16.248H2.031V2.001z" fill="#fff" />
        </Mask>
        <G mask="url(#b)">
          <Path
            d="M2.031 13.258v4.991h2.723v-3.641l11.018-8.361-2.255-1.705L2.03 13.258z"
            fill="#0556DB"
          />
        </G>
        <Mask
          id="c"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={2}
          y={2}
          width={17}
          height={17}
        >
          <Path d="M2.031 2.001H18.28v16.248H2.031V2.001z" fill="#fff" />
        </Mask>
        <G mask="url(#c)">
          <Path
            d="M14.612 8.784l.956.722v6.006H6.164v2.736h12.127V8.14l-1.419-1.073-2.26 1.716z"
            fill="#0556DB"
          />
        </G>
        <Mask
          id="d"
          style={{
            maskType: 'luminance',
          }}
          maskUnits="userSpaceOnUse"
          x={2}
          y={2}
          width={17}
          height={17}
        >
          <Path d="M2.031 2.001H18.28v16.248H2.031V2.001z" fill="#fff" />
        </Mask>
        <G mask="url(#d)">
          <Path
            d="M10.155 2.001L2.031 8.142v3.422L12.4 3.697 10.155 2z"
            fill="#0556DB"
          />
        </G>
      </G>
    </Svg>
  );
}

export function RFIDIcon(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 12 12" {...props}>
      <Path
        d="M1.212 11.25H7.5V7.5h3.75V1.212a.45.45 0 00-.13-.332.45.45 0 00-.331-.13H1.212A.45.45 0 00.88.88a.45.45 0 00-.13.332v9.576a.45.45 0 00.13.332.45.45 0 00.332.13zm0 .75c-.336 0-.622-.118-.858-.354A1.168 1.168 0 010 10.789V1.212C0 .876.118.59.354.354S.876 0 1.212 0h9.576c.336 0 .622.118.858.354s.354.522.354.858v6.504L7.716 12H1.212zm1.701-4.904v-.75H6v.75H2.913zm0-2.971v-.75h6.174v.75H2.913z"
        fill="currentColor"
      />
    </Svg>
  );
}

export function DependentIcon(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 18 12" {...props}>
      <Path
        d="M12.942 7.465c-.495 0-.922-.178-1.279-.535a1.745 1.745 0 01-.535-1.279c0-.495.178-.921.535-1.278a1.745 1.745 0 011.279-.536c.495 0 .921.179 1.278.536.357.357.536.783.536 1.278 0 .496-.179.922-.536 1.279a1.745 1.745 0 01-1.278.535zM8.86 12v-.816c0-.282.07-.537.211-.766.14-.228.34-.393.599-.494a8.114 8.114 0 011.586-.484 8.712 8.712 0 014.958.484c.258.1.458.266.598.494.14.23.211.484.211.766V12H8.86zM6.35 5.442a2.62 2.62 0 01-1.922-.8 2.62 2.62 0 01-.8-1.921c0-.748.267-1.389.8-1.922A2.62 2.62 0 016.35 0 2.62 2.62 0 018.27.8c.532.532.799 1.173.799 1.92a2.62 2.62 0 01-.8 1.923 2.62 2.62 0 01-1.921.799zM0 12v-1.493c0-.392.108-.753.324-1.082a1.93 1.93 0 01.883-.729 11.3 11.3 0 015.142-1.231c.366 0 .732.02 1.099.058.366.038.732.089 1.098.151a1163.36 1163.36 0 00-.774.81 5.34 5.34 0 00-.712-.091c-.237-.014-.474-.02-.711-.02-.819 0-1.627.088-2.425.264a8.72 8.72 0 00-2.285.855c-.197.11-.369.248-.514.413a.879.879 0 00-.218.602v.586h5.442V12H0zm6.349-7.465c.499 0 .926-.178 1.28-.533.356-.355.534-.782.534-1.281 0-.499-.178-.926-.533-1.281A1.746 1.746 0 006.349.907c-.499 0-.926.178-1.281.533a1.747 1.747 0 00-.533 1.28c0 .5.177.927.533 1.282.355.355.782.533 1.28.533z"
        fill="currentColor"
      />
    </Svg>
  );
}
