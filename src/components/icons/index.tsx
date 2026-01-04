import Svg, { Path, SvgProps } from 'react-native-svg';

export function MaterialSymbolsDomainAdd(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M2 21V3h10v4h10v8h-2V9h-8v2h2v2h-2v2h2v2h-2v2h4v2zm2-2h2v-2H4zm0-4h2v-2H4zm0-4h2V9H4zm0-4h2V5H4zm4 12h2v-2H8zm0-4h2v-2H8zm0-4h2V9H8zm0-4h2V5H8zm12 16v-2h-2v-2h2v-2h2v2h2v2h-2v2zm-4-10v-2h2v2zm0 4v-2h2v2z"
      />
    </Svg>
  );
}

export function RiInformationFill(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m-1-11v6h2v-6zm0-4v2h2V7z"
      />
    </Svg>
  );
}

export function MaterialSymbolsPersonAdd(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3zm-9-2q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z"
      />
    </Svg>
  );
}

export function MaterialSymbolsHome(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" />
    </Svg>
  );
}

// export function MaterialSymbolsHomeOutline(props) {
//  return (
//     <Svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">{/* Icon from Material Symbols by Google - https://github.com/google/material-design-icons/blob/master/LICENSE */}<Path fill="currentColor" d="M6 19h3v-6h6v6h3v-9l-6-4.5L6 10zm-2 2V9l8-6l8 6v12h-7v-6h-2v6zm8-8.75" /></Svg>
//  )
// }

export function MaterialSymbolsMail(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7l8-5V6l-8 5l-8-5v2z"
      />
    </Svg>
  );
}
