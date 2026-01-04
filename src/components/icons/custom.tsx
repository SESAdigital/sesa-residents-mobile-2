import Svg, { Path, SvgProps } from 'react-native-svg';

export function MailSuccessIcon(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" {...props}>
      <Path
        fill="#00C593"
        d="M13.57 0h52.599a13.574 13.574 0 0 1 13.57 13.523V41.78a13.57 13.57 0 0 1-13.523 13.57H13.57A13.574 13.574 0 0 1 0 41.827V13.57a13.57 13.57 0 0 1 1.027-5.196 13.586 13.586 0 0 1 2.941-4.406 13.586 13.586 0 0 1 4.406-2.94A13.578 13.578 0 0 1 13.57 0Z"
      />
      <Path
        stroke="#2D2D2D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.5}
        d="M75.544 51.34 39.873 22.85 4.199 51.34"
      />
      <Path
        fill="#000"
        d="M39.825 43.927 75.498 3.729H4.199l35.627 40.198Z"
        opacity={0.3}
      />
      <Path
        fill="#00C593"
        d="M39.825 32.221 75.498 3.73A13.67 13.67 0 0 0 66.124 0H13.572a13.765 13.765 0 0 0-9.373 3.73L39.825 32.22Z"
      />
      <Path
        stroke="#2D2D2D"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeOpacity={0.5}
        d="m4.2 3.73 35.625 28.492L75.497 3.729"
      />
    </Svg>
  );
}
