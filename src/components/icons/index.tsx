import Svg, { Path, SvgProps, ClipPath, G, Defs } from 'react-native-svg';

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

export function RiEyeOffFill(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M4.52 5.935L1.394 2.808l1.414-1.414l19.799 19.798l-1.414 1.415l-3.31-3.31A10.95 10.95 0 0 1 12 21c-5.392 0-9.878-3.88-10.818-9A11 11 0 0 1 4.52 5.935m10.238 10.237l-1.464-1.464a3 3 0 0 1-4.001-4.001L7.829 9.243a5 5 0 0 0 6.929 6.929M7.974 3.76C9.221 3.27 10.58 3 12 3c5.392 0 9.878 3.88 10.819 9a10.95 10.95 0 0 1-2.012 4.593l-3.86-3.86Q17 12.373 17 12a5 5 0 0 0-5.732-4.947z"
      />
    </Svg>
  );
}

export const Eye2Line = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <G clipPath="url(#a)">
      <Path
        fill="currentColor"
        d="M9 1.5a7.5 7.5 0 1 1 0 15 7.5 7.5 0 0 1 0-15ZM9 3a6 6 0 1 0 0 12A6 6 0 0 0 9 3Zm0 2.25a3.75 3.75 0 1 1-3.585 2.645A1.874 1.874 0 0 0 9 7.125a1.875 1.875 0 0 0-1.105-1.71c.35-.107.72-.165 1.105-.165Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h18v18H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export function MaterialSymbolsCall(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"
      />
    </Svg>
  );
}

export function MaterialSymbolsLocationOn(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 10q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22"
      />
    </Svg>
  );
}

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

export function MaterialSymbolsLightbulb(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 22q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22m-4-3v-2h8v2zm.25-3q-1.725-1.025-2.738-2.75T4.5 9.5q0-3.125 2.188-5.312T12 2t5.313 2.188T19.5 9.5q0 2.025-1.012 3.75T15.75 16z"
      />
    </Svg>
  );
}

export function MaterialSymbolsReceiptLong(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6 22q-1.25 0-2.125-.875T3 19v-3h3V2l1.5 1.5L9 2l1.5 1.5L12 2l1.5 1.5L15 2l1.5 1.5L18 2l1.5 1.5L21 2v17q0 1.25-.875 2.125T18 22zm12-2q.425 0 .713-.288T19 19V5H8v11h9v3q0 .425.288.713T18 20M9 9V7h6v2zm0 3v-2h6v2zm8-3q-.425 0-.712-.288T16 8t.288-.712T17 7t.713.288T18 8t-.288.713T17 9m0 3q-.425 0-.712-.288T16 11t.288-.712T17 10t.713.288T18 11t-.288.713T17 12"
      />
    </Svg>
  );
}

export function MaterialSymbolsPayments(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M3 20q-.825 0-1.412-.587T1 18V7h2v11h17v2zm4-4q-.825 0-1.412-.587T5 14V6q0-.825.588-1.412T7 4h14q.825 0 1.413.588T23 6v8q0 .825-.587 1.413T21 16zm2-2q0-.825-.587-1.412T7 12v2zm10 0h2v-2q-.825 0-1.412.588T19 14m-5-1q1.25 0 2.125-.875T17 10t-.875-2.125T14 7t-2.125.875T11 10t.875 2.125T14 13M7 8q.825 0 1.413-.587T9 6H7zm14 0V6h-2q0 .825.588 1.413T21 8"
      />
    </Svg>
  );
}

export function MaterialSymbolsEmojiObjects(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 22q-.65 0-1.175-.312T10 20.85q-.825 0-1.412-.587T8 18.85V15.3q-1.475-.975-2.363-2.575T4.75 9.25q0-3.025 2.113-5.137T12 2t5.138 2.113T19.25 9.25q0 1.925-.888 3.5T16 15.3v3.55q0 .825-.587 1.413T14 20.85q-.3.525-.825.838T12 22m-2-3.15h4v-.9h-4zm0-1.9h4V16h-4zM12.75 14v-2.7l2.2-2.2l-1.05-1.05l-1.9 1.9l-1.9-1.9L9.05 9.1l2.2 2.2V14z"
      />
    </Svg>
  );
}

export function MaterialSymbolsHandyman(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M18.85 21.975q-.2 0-.375-.062t-.325-.213l-5.1-5.1q-.15-.15-.213-.325t-.062-.375t.063-.375t.212-.325l2.125-2.125q.15-.15.325-.212t.375-.063t.375.063t.325.212l5.1 5.1q.15.15.213.325t.062.375t-.062.375t-.213.325L19.55 21.7q-.15.15-.325.213t-.375.062M5.125 22q-.2 0-.387-.075T4.4 21.7l-2.1-2.1q-.15-.15-.225-.338T2 18.876t.075-.375t.225-.325l5.3-5.3h2.125l.85-.85L6.45 7.9H5.025L2 4.875L4.825 2.05L7.85 5.075V6.5l4.125 4.125l2.9-2.9L13.8 6.65l1.4-1.4h-2.825l-.7-.7L15.225 1l.7.7v2.825l1.4-1.4l3.55 3.55q.425.425.65.963t.225 1.137t-.225 1.15t-.65.975L18.75 8.775l-1.4 1.4l-1.05-1.05l-5.175 5.175v2.1l-5.3 5.3q-.15.15-.325.225T5.125 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsHowToVote(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 22q-.825 0-1.412-.587T3 20v-4.55l2.75-3.125l1.425 1.425l-2 2.25h13.65l-1.95-2.2l1.425-1.425L21 15.45V20q0 .825-.587 1.413T19 22zm5.6-7.6l-3.475-3.525Q6.55 10.3 6.55 9.45t.575-1.425l4.9-4.9q.575-.575 1.425-.575t1.425.575L18.4 6.6q.575.575.588 1.412t-.563 1.413l-5 5q-.575.575-1.412.563T10.6 14.4M17 8l-3.55-3.5L8.5 9.45l3.55 3.5z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLocalMall(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 22q-.825 0-1.412-.587T3 20V8q0-.825.588-1.412T5 6h2q0-2.075 1.463-3.537T12 1t3.538 1.463T17 6h2q.825 0 1.413.588T21 8v12q0 .825-.587 1.413T19 22zm7-8q2.075 0 3.538-1.463T17 9h-2q0 1.25-.875 2.125T12 12t-2.125-.875T9 9H7q0 2.075 1.463 3.538T12 14M9 6h6q0-1.25-.875-2.125T12 3t-2.125.875T9 6"
      />
    </Svg>
  );
}

export function MaterialSymbolsShieldWithHeart(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 16q2.55-2.3 3.275-3.238T16 10.9q0-.9-.65-1.55T13.8 8.7q-.525 0-1.013.212T12 9.5q-.3-.375-.775-.587T10.2 8.7q-.9 0-1.55.65T8 10.9q0 .475.125.875t.55.938t1.212 1.312T12 16m0 6q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsBed(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M2 19v-6q0-.675.275-1.225T3 10.8V8q0-1.25.875-2.125T6 5h4q.575 0 1.075.213T12 5.8q.425-.375.925-.587T14 5h4q1.25 0 2.125.875T21 8v2.8q.45.425.725.975T22 13v6h-2v-2H4v2zm11-9h6V8q0-.425-.288-.712T18 7h-4q-.425 0-.712.288T13 8zm-8 0h6V8q0-.425-.288-.712T10 7H6q-.425 0-.712.288T5 8z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightHistory(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M11.962 20q-3.046 0-5.311-1.99q-2.264-1.989-2.62-5.01h1.011q.408 2.58 2.351 4.29T11.962 19q2.925 0 4.962-2.037T18.962 12t-2.038-4.963T11.962 5q-1.553 0-2.918.656q-1.365.655-2.41 1.805h2.481v1H4.962V4.309h1v2.388q1.16-1.273 2.718-1.984T11.962 4q1.663 0 3.118.626t2.542 1.714t1.714 2.542t.626 3.118t-.626 3.118t-1.714 2.542t-2.542 1.714t-3.118.626m3.204-4.146l-3.647-3.646V7h1v4.792l3.354 3.354z"
      />
    </Svg>
  );
}

export function MaterialSymbolsHistory(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 21q-3.45 0-6.012-2.287T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.037T19 12t-2.037-4.962T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924t1.925 2.85T21 12t-.712 3.513t-1.925 2.85t-2.85 1.925T12 21m2.8-4.8L11 12.4V7h2v4.6l3.2 3.2z"
      />
    </Svg>
  );
}

export function MaterialSymbolsHelp(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M11.95 18q.525 0 .888-.363t.362-.887t-.362-.888t-.888-.362t-.887.363t-.363.887t.363.888t.887.362m-.9-3.85h1.85q0-.825.188-1.3t1.062-1.3q.65-.65 1.025-1.238T15.55 8.9q0-1.4-1.025-2.15T12.1 6q-1.425 0-2.312.75T8.55 8.55l1.65.65q.125-.45.563-.975T12.1 7.7q.8 0 1.2.438t.4.962q0 .5-.3.938t-.75.812q-1.1.975-1.35 1.475t-.25 1.825M12 22q-2.075 0-3.9-.787t-3.175-2.138T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsSettings(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5"
      />
    </Svg>
  );
}

export function MingcuteSearchLine(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <G fill="none" fillRule="evenodd">
        <Path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
        <Path
          fill="currentColor"
          d="M10.5 2a8.5 8.5 0 1 0 5.262 15.176l3.652 3.652a1 1 0 0 0 1.414-1.414l-3.652-3.652A8.5 8.5 0 0 0 10.5 2M4 10.5a6.5 6.5 0 1 1 13 0a6.5 6.5 0 0 1-13 0"
        />
      </G>
    </Svg>
  );
}

export function RiRecordCircleFill(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-7a3 3 0 1 0 0-6a3 3 0 0 0 0 6"
      />
    </Svg>
  );
}

export function MaterialSymbolsCalendarTodayRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V3q0-.425.288-.712T7 2t.713.288T8 3v1h8V3q0-.425.288-.712T17 2t.713.288T18 3v1h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"
      />
    </Svg>
  );
}

export function MaterialSymbolsCloseRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"
      />
    </Svg>
  );
}

export function MaterialSymbolsRefresh(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 20q-3.35 0-5.675-2.325T4 12t2.325-5.675T12 4q1.725 0 3.3.712T18 6.75V4h2v7h-7V9h4.2q-.8-1.4-2.187-2.2T12 6Q9.5 6 7.75 7.75T6 12t1.75 4.25T12 18q1.925 0 3.475-1.1T17.65 14h2.1q-.7 2.65-2.85 4.325T12 20"
      />
    </Svg>
  );
}

export function MaterialSymbolsOpenInNewRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h6q.425 0 .713.288T12 4t-.288.713T11 5H5v14h14v-6q0-.425.288-.712T20 12t.713.288T21 13v6q0 .825-.587 1.413T19 21zM19 6.4L10.4 15q-.275.275-.7.275T9 15t-.275-.7t.275-.7L17.6 5H15q-.425 0-.712-.288T14 4t.288-.712T15 3h5q.425 0 .713.288T21 4v5q0 .425-.288.713T20 10t-.712-.288T19 9z"
      />
    </Svg>
  );
}

export function MaterialSymbolsContentCopyOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M9 18q-.825 0-1.412-.587T7 16V4q0-.825.588-1.412T9 2h9q.825 0 1.413.588T20 4v12q0 .825-.587 1.413T18 18zm0-2h9V4H9zm-4 6q-.825 0-1.412-.587T3 20V6h2v14h11v2zm4-6V4z"
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

export function MaterialSymbolsLightHomeOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6 19h3.692v-5.884h4.616V19H18v-9l-6-4.538L6 10zm-1 1V9.5l7-5.288L19 9.5V20h-5.692v-5.884h-2.616V20zm7-7.77"
      />
    </Svg>
  );
}

export function MaterialSymbolsCalendarClock(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v4.675q0 .425-.288.713t-.712.287t-.712-.288t-.288-.712V10H5v10h5.8q.425 0 .713.288T11.8 21t-.288.713T10.8 22zm13 1q-2.075 0-3.537-1.463T13 18t1.463-3.537T18 13t3.538 1.463T23 18t-1.463 3.538T18 23m1.675-2.625l.7-.7L18.5 17.8V15h-1v3.2z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightCalendarClockOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 9.615h14v-3q0-.23-.192-.423T18.384 6H5.616q-.231 0-.424.192T5 6.616zm0 0V6zM5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V2.77h1.077V5h7.154V2.77h1V5h1.769q.69 0 1.153.463T20 6.616v5.251q-.244-.09-.494-.134T19 11.652v-1.036H5v8.769q0 .23.192.423t.423.192h6.704q.079.28.201.521q.122.24.255.479zm12.769 1q-1.671 0-2.836-1.164Q14.385 19.67 14.385 18t1.164-2.835T18.384 14t2.836 1.165T22.385 18t-1.165 2.836T18.385 22m1.655-1.798l.546-.546l-1.817-1.818v-2.722H18v3.046z"
      />
    </Svg>
  );
}

export function MaterialSymbolsGridView(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M3 11V3h8v8zm0 10v-8h8v8zm10-10V3h8v8zm0 10v-8h8v8z"
      />
    </Svg>
  );
}
export function MaterialSymbolsLightGridViewOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M4 11V4h7v7zm0 9v-7h7v7zm9-9V4h7v7zm0 9v-7h7v7zM5 10h5V5H5zm9 0h5V5h-5zm0 9h5v-5h-5zm-9 0h5v-5H5zm5-9"
      />
    </Svg>
  );
}

export function MaterialSymbolsNotifications(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M4 19v-2h2v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h2v2zm8 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightNotificationsOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 18.77v-1h1.616V9.845q0-1.96 1.24-3.447T11 4.546V4q0-.417.291-.708q.291-.292.707-.292t.709.292T13 4v.546q1.904.365 3.144 1.853t1.24 3.447v7.923H19v1zm6.997 2.615q-.668 0-1.14-.475t-.472-1.14h3.23q0 .67-.475 1.142q-.476.472-1.143.472M7.616 17.77h8.769V9.846q0-1.823-1.281-3.104T12 5.462t-3.104 1.28t-1.28 3.104z"
      />
    </Svg>
  );
}

export function MaterialSymbolsAccountCircle(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5.85 17.1q1.275-.975 2.85-1.537T12 15t3.3.563t2.85 1.537q.875-1.025 1.363-2.325T20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.475.488 2.775T5.85 17.1M12 13q-1.475 0-2.488-1.012T8.5 9.5t1.013-2.488T12 6t2.488 1.013T15.5 9.5t-1.012 2.488T12 13m0 9q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightAccountCircleOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6.196 17.485q1.275-.918 2.706-1.451Q10.332 15.5 12 15.5t3.098.534t2.706 1.45q.99-1.025 1.593-2.42Q20 13.667 20 12q0-3.325-2.337-5.663T12 4T6.337 6.338T4 12q0 1.667.603 3.064q.603 1.396 1.593 2.42m5.805-4.984q-1.264 0-2.133-.868T9 9.501t.868-2.133T12 6.5t2.132.868T15 9.5t-.868 2.132t-2.131.868M12 21q-1.883 0-3.525-.701t-2.858-1.916t-1.916-2.858T3 12t.701-3.525t1.916-2.858q1.216-1.215 2.858-1.916T12 3t3.525.701t2.858 1.916t1.916 2.858T21 12t-.701 3.525t-1.916 2.858q-1.216 1.215-2.858 1.916T12 21m0-1q1.383 0 2.721-.484q1.338-.483 2.313-1.324q-.974-.783-2.255-1.237T12 16.5t-2.789.445t-2.246 1.247q.975.84 2.314 1.324T12 20m0-8.5q.842 0 1.421-.579T14 9.5t-.579-1.421T12 7.5t-1.421.579T10 9.5t.579 1.421T12 11.5m0 6.75"
      />
    </Svg>
  );
}

export function MaterialSymbolsArrowDropDown(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path fill="currentColor" d="m12 15l-5-5h10z" />
    </Svg>
  );
}

export function MaterialSymbolsChevronRightRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12.6 12L8.7 8.1q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7z"
      />
    </Svg>
  );
}

export function MaterialSymbolsChevronLeftRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m10.8 12l3.9 3.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.212-.325T8.425 12t.063-.375t.212-.325l4.6-4.6q.275-.275.7-.275t.7.275t.275.7t-.275.7z"
      />
    </Svg>
  );
}

export function MaterialSymbolsSos(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M10.5 17q-.825 0-1.412-.587T8.5 15V9q0-.825.588-1.412T10.5 7h3q.825 0 1.413.588T15.5 9v6q0 .825-.587 1.413T13.5 17zM1 17v-2h4v-2H3q-.825 0-1.412-.587T1 11V9q0-.825.588-1.412T3 7h4v2H3v2h2q.825 0 1.413.588T7 13v2q0 .825-.587 1.413T5 17zm16 0v-2h4v-2h-2q-.825 0-1.412-.587T17 11V9q0-.825.588-1.412T19 7h4v2h-4v2h2q.825 0 1.413.588T23 13v2q0 .825-.587 1.413T21 17zm-6.5-2h3V9h-3z"
      />
    </Svg>
  );
}

export function MaterialSymbolsGroupAdd(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12.5 11.95q.725-.8 1.113-1.825T14 8t-.387-2.125T12.5 4.05q1.5.2 2.5 1.325T16 8t-1 2.625t-2.5 1.325M18 20v-3q0-.9-.4-1.713t-1.05-1.437q1.275.45 2.363 1.163T20 17v3zm2-7v-2h-2V9h2V7h2v2h2v2h-2v2zM8 12q-1.65 0-2.825-1.175T4 8t1.175-2.825T8 4t2.825 1.175T12 8t-1.175 2.825T8 12m-8 8v-2.8q0-.85.438-1.562T1.6 14.55q1.55-.775 3.15-1.162T8 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T16 17.2V20z"
      />
    </Svg>
  );
}

export function MaterialSymbolsCalendarAddOn(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M17 22v-3h-3v-2h3v-3h2v3h3v2h-3v3zM5 20q-.825 0-1.412-.587T3 18V6q0-.825.588-1.412T5 4h1V2h2v2h6V2h2v2h1q.825 0 1.413.588T19 6v6.1q-.5-.075-1-.075t-1 .075V10H5v8h7q0 .5.075 1t.275 1z"
      />
    </Svg>
  );
}

export function MaterialSymbolsGroups(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M0 18v-1.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0v-1.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V18zm13.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"
      />
    </Svg>
  );
}

export function MdiLightArrowRight(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M4 12h12.25L11 6.75l.66-.75l6.5 6.5l-6.5 6.5l-.66-.75L16.25 13H4z"
      />
    </Svg>
  );
}

export function MdiLightArrowLeft(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M19 13H6.75L12 18.25l-.66.75l-6.5-6.5l6.5-6.5l.66.75L6.75 12H19z"
      />
    </Svg>
  );
}

export function MaterialSymbolsBackspace(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m11.4 16l2.6-2.6l2.6 2.6l1.4-1.4l-2.6-2.6L18 9.4L16.6 8L14 10.6L11.4 8L10 9.4l2.6 2.6l-2.6 2.6zM9 20q-.475 0-.9-.213t-.7-.587L2 12l5.4-7.2q.275-.375.7-.587T9 4h11q.825 0 1.413.587T22 6v12q0 .825-.587 1.413T20 20z"
      />
    </Svg>
  );
}

export function MaterialSymbolsQrCode(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M3 11V3h8v8zm2-2h4V5H5zM3 21v-8h8v8zm2-2h4v-4H5zm8-8V3h8v8zm2-2h4V5h-4zm4 12v-2h2v2zm-6-6v-2h2v2zm2 2v-2h2v2zm-2 2v-2h2v2zm2 2v-2h2v2zm2-2v-2h2v2zm0-4v-2h2v2zm2 2v-2h2v2z"
      />
    </Svg>
  );
}

export function MaterialSymbolsQrCodeScanner(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M2 7V2h5v2H4v3zm0 15v-5h2v3h3v2zm15 0v-2h3v-3h2v5zm3-15V4h-3V2h5v5zm-2.5 10.5H19V19h-1.5zm0-3H19V16h-1.5zM16 16h1.5v1.5H16zm-1.5 1.5H16V19h-1.5zM13 16h1.5v1.5H13zm3-3h1.5v1.5H16zm-1.5 1.5H16V16h-1.5zM13 13h1.5v1.5H13zm6-8v6h-6V5zm-8 8v6H5v-6zm0-8v6H5V5zM9.5 17.5v-3h-3v3zm0-8v-3h-3v3zm8 0v-3h-3v3z"
      />
    </Svg>
  );
}

export function MaterialSymbolsTouchApp(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M10.475 22q-.7 0-1.312-.3t-1.038-.85l-5.45-6.925l.475-.5q.5-.525 1.2-.625t1.3.275L7.5 14.2V6q0-.425.288-.712T8.5 5t.725.288t.3.712v5H17q1.25 0 2.125.875T20 14v4q0 1.65-1.175 2.825T16 22zm-6.3-13.5q-.325-.55-.5-1.187T3.5 6q0-2.075 1.463-3.537T8.5 1t3.538 1.463T13.5 6q0 .675-.175 1.313t-.5 1.187l-1.725-1q.2-.35.3-.712T11.5 6q0-1.25-.875-2.125T8.5 3t-2.125.875T5.5 6q0 .425.1.788t.3.712z"
      />
    </Svg>
  );
}

export function MaterialSymbolsCheckRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m9.55 15.15l8.475-8.475q.3-.3.7-.3t.7.3t.3.713t-.3.712l-9.175 9.2q-.3.3-.7.3t-.7-.3L4.55 13q-.3-.3-.288-.712t.313-.713t.713-.3t.712.3z"
      />
    </Svg>
  );
}

export function MaterialSymbolsHorizontalRuleRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 13q-.425 0-.712-.288T4 12t.288-.712T5 11h14q.425 0 .713.288T20 12t-.288.713T19 13z"
      />
    </Svg>
  );
}

export function MaterialSymbolsPentagonRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M7.45 21q-.65 0-1.175-.375t-.725-1l-3.075-9.2q-.2-.65 0-1.275t.75-1L10.85 2.8q.525-.35 1.15-.35t1.15.35l7.625 5.35q.55.375.75 1t0 1.275l-3.075 9.2q-.2.625-.725 1T16.55 21z"
      />
    </Svg>
  );
}

export function MaterialSymbolsPauseCircleRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M10 16q.425 0 .713-.288T11 15V9q0-.425-.288-.712T10 8t-.712.288T9 9v6q0 .425.288.713T10 16m4 0q.425 0 .713-.288T15 15V9q0-.425-.288-.712T14 8t-.712.288T13 9v6q0 .425.288.713T14 16m-2 6q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightCallOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M18.93 20q-2.528 0-5.184-1.266t-4.935-3.555t-3.545-4.935T4 5.07q0-.458.3-.763T5.05 4h2.473q.408 0 .712.257t.411.659L9.142 7.3q.07.42-.025.733t-.333.513L6.59 10.592q.616 1.117 1.361 2.076t1.59 1.817q.87.87 1.874 1.62q1.004.749 2.204 1.414l2.139-2.177q.244-.263.549-.347q.304-.083.674-.033l2.103.43q.408.1.662.411t.254.712v2.435q0 .45-.306.75t-.763.3M6.12 9.654l1.92-1.765q.095-.077.124-.212q.03-.135-.01-.25l-.443-2.12q-.039-.153-.135-.23T7.327 5H5.275q-.115 0-.192.077t-.077.192q.029 1.025.321 2.14t.794 2.245m8.45 8.334q1.014.502 2.16.743q1.148.24 2 .257q.115 0 .192-.077T19 18.72v-2.008q0-.153-.077-.25q-.077-.096-.23-.134l-1.85-.379q-.116-.039-.203-.01q-.086.03-.182.125zm0 0"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightEmergencyHomeOutlineRounded(
  props: SvgProps,
) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 20.775q-.304 0-.598-.125q-.295-.125-.538-.354l-7.16-7.16q-.23-.243-.354-.538q-.125-.294-.125-.598t.121-.602t.358-.534l7.16-7.16q.243-.25.538-.364T12 3.225t.602.118t.535.36l7.16 7.16q.241.237.36.53t.118.607q0 .304-.114.598t-.365.538l-7.16 7.16q-.236.237-.53.358q-.293.121-.606.121m.442-1.192l7.14-7.14q.155-.154.155-.443t-.154-.442l-7.14-7.14q-.154-.155-.443-.155t-.442.154l-7.14 7.14q-.155.155-.155.443t.154.442l7.14 7.14q.155.155.443.155t.442-.154m-.441-6.41q.213 0 .356-.144t.143-.356v-4.23q0-.213-.144-.357t-.357-.144t-.356.144t-.143.356v4.231q0 .212.144.356t.357.144M12 15.403q.262 0 .439-.176q.176-.177.176-.439t-.176-.438t-.439-.177t-.438.177t-.177.439t.177.438t.438.177M12 12"
      />
    </Svg>
  );
}

export function RiFireLine(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 23a7.5 7.5 0 0 0 7.5-7.5c0-.866-.23-1.697-.5-2.47q-2.5 2.47-3.8 2.47c3.995-7 1.8-10-4.2-14c.5 5-2.796 7.274-4.138 8.537A7.5 7.5 0 0 0 12 23m.71-17.765c3.241 2.75 3.257 4.887.753 9.274c-.761 1.333.202 2.991 1.737 2.991c.688 0 1.384-.2 2.119-.595a5.5 5.5 0 1 1-9.087-5.412c.126-.118.765-.685.793-.71c.424-.38.773-.717 1.118-1.086c1.23-1.318 2.114-2.78 2.566-4.462"
      />
    </Svg>
  );
}

export function MaterialSymbolsShieldOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.6-.825 4.3-3.3t1.7-5.5V6.375l-6-2.25l-6 2.25V11.1q0 3.025 1.7 5.5t4.3 3.3m0-7.9"
      />
    </Svg>
  );
}

export function RiHospitalLine(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M8 20v-6h8v6h3V4H5v16zm2 0h4v-4h-4zm11 0h2v2H1v-2h2V3a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1zM11 8V6h2v2h2v2h-2v2h-2v-2H9V8z"
      />
    </Svg>
  );
}

export function MaterialSymbolsExpandMore(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m12 15.375l-6-6l1.4-1.4l4.6 4.6l4.6-4.6l1.4 1.4z"
      />
    </Svg>
  );
}

export function MaterialSymbolsCalendarToday(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 22q-.825 0-1.412-.587T3 20V6q0-.825.588-1.412T5 4h1V2h2v2h8V2h2v2h1q.825 0 1.413.588T21 6v14q0 .825-.587 1.413T19 22zm0-2h14V10H5z"
      />
    </Svg>
  );
}

export function MaterialSymbolsScheduleOutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M13 11.6V8q0-.425-.288-.712T12 7t-.712.288T11 8v3.975q0 .2.075.388t.225.337l3.3 3.3q.275.275.7.275T16 16t.275-.7t-.275-.7zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22m0-2q3.325 0 5.663-2.337T20 12t-2.337-5.663T12 4T6.337 6.338T4 12t2.338 5.663T12 20"
      />
    </Svg>
  );
}

export function MaterialSymbolsSchedule(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m15.3 16.7l1.4-1.4l-3.7-3.7V7h-2v5.4zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsPersonAddOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3zm-9-2q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20zm2-2h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T9 15t-2.775.338T3.5 16.35q-.225.125-.363.35T3 17.2zm6-8q.825 0 1.413-.587T11 8t-.587-1.412T9 6t-1.412.588T7 8t.588 1.413T9 10m0 8"
      />
    </Svg>
  );
}

export function MaterialSymbolsGroupOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M1 20v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20zm18 0v-3q0-1.1-.612-2.113T16.65 13.15q1.275.15 2.4.513t2.1.887q.9.5 1.375 1.112T23 17v3zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m10-4q0 1.65-1.175 2.825T15 12q-.275 0-.7-.062t-.7-.138q.675-.8 1.038-1.775T15 8t-.362-2.025T13.6 4.2q.35-.125.7-.163T15 4q1.65 0 2.825 1.175T19 8M3 18h12v-.8q0-.275-.137-.5t-.363-.35q-1.35-.675-2.725-1.012T9 15t-2.775.338T3.5 16.35q-.225.125-.363.35T3 17.2zm6-8q.825 0 1.413-.587T11 8t-.587-1.412T9 6t-1.412.588T7 8t.588 1.413T9 10m0-2"
      />
    </Svg>
  );
}

export function MaterialSymbolsEngineeringOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M1.05 21v-2.8q0-.825.425-1.55t1.175-1.1q1.275-.65 2.875-1.1T9.05 14t3.525.45t2.875 1.1q.75.375 1.175 1.1t.425 1.55V21zm2-2h12v-.8q0-.275-.137-.5t-.363-.35q-.9-.45-2.312-.9T9.05 16t-3.187.45t-2.313.9q-.225.125-.362.35t-.138.5zm6-6q-1.65 0-2.825-1.175T5.05 9H4.8q-.225 0-.362-.137T4.3 8.5t.138-.363T4.8 8h.25q0-1.125.55-2.025T7.05 4.55v.95q0 .225.138.363T7.55 6t.363-.137t.137-.363V4.15q.225-.075.475-.112T9.05 4t.525.038t.475.112V5.5q0 .225.138.363T10.55 6t.363-.137t.137-.363v-.95q.9.525 1.45 1.425T13.05 8h.25q.225 0 .363.138t.137.362t-.137.363T13.3 9h-.25q0 1.65-1.175 2.825T9.05 13m0-2q.825 0 1.413-.587T11.05 9h-4q0 .825.588 1.413T9.05 11m7.5 4l-.15-.75q-.15-.05-.287-.112t-.263-.188l-.7.25l-.5-.9l.55-.5v-.6l-.55-.5l.5-.9l.7.25q.1-.1.25-.175t.3-.125l.15-.75h1l.15.75q.15.05.3.125t.25.175l.7-.25l.5.9l-.55.5v.6l.55.5l-.5.9l-.7-.25q-.125.125-.262.188t-.288.112l-.15.75zm.5-1.75q.3 0 .525-.225t.225-.525t-.225-.525t-.525-.225t-.525.225t-.225.525t.225.525t.525.225m1.8-3.25l-.2-1.05q-.225-.075-.412-.187T17.9 8.5l-1.05.35l-.7-1.2l.85-.75q-.05-.125-.05-.2v-.4q0-.075.05-.2l-.85-.75l.7-1.2l1.05.35q.15-.15.338-.263t.412-.187l.2-1.05h1.4l.2 1.05q.225.075.413.188t.337.262l1.05-.35l.7 1.2l-.85.75q.05.125.05.2v.4q0 .075-.05.2l.85.75l-.7 1.2l-1.05-.35q-.15.15-.337.263t-.413.187l-.2 1.05zm.7-2.25q.525 0 .888-.363T20.8 6.5t-.363-.888t-.887-.362t-.888.363t-.362.887t.363.888t.887.362M9.05 19"
      />
    </Svg>
  );
}

export function MaterialSymbolsE911Emergency(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 20v-2h1.6l1.975-6.575q.2-.65.738-1.037T10.5 10h3q.65 0 1.188.388t.737 1.037L17.4 18H19v2zm6-12V3h2v5zm5.95 2.475L15.525 9.05l3.55-3.525l1.4 1.4zM18 15v-2h5v2zM7.05 10.475l-3.525-3.55l1.4-1.4l3.55 3.525zM1 15v-2h5v2z"
      />
    </Svg>
  );
}

export function MaterialSymbolsHeadsetMic(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 23v-2h7v-1h-4v-8h4v-1q0-2.9-2.05-4.95T12 4T7.05 6.05T5 11v1h4v8H5q-.825 0-1.412-.587T3 18v-7q0-1.85.713-3.488T5.65 4.65t2.863-1.937T12 2t3.488.713T18.35 4.65t1.938 2.863T21 11v10q0 .825-.587 1.413T19 23z"
      />
    </Svg>
  );
}

export function MaterialSymbolsSecurity(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 22q-3.475-.875-5.738-3.988T4 11.1V5l8-3l8 3v6.1q0 3.8-2.262 6.913T12 22m0-2.1q2.425-.75 4.05-2.963T17.95 12H12V4.125l-6 2.25v5.175q0 .175.05.45H12z"
      />
    </Svg>
  );
}

export function MaterialSymbolsMoreHoriz(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6 14q-.825 0-1.412-.587T4 12t.588-1.412T6 10t1.413.588T8 12t-.587 1.413T6 14m6 0q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m6 0q-.825 0-1.412-.587T16 12t.588-1.412T18 10t1.413.588T20 12t-.587 1.413T18 14"
      />
    </Svg>
  );
}

export function MaterialSymbolsAddRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M11 13H6q-.425 0-.712-.288T5 12t.288-.712T6 11h5V6q0-.425.288-.712T12 5t.713.288T13 6v5h5q.425 0 .713.288T19 12t-.288.713T18 13h-5v5q0 .425-.288.713T12 19t-.712-.288T11 18z"
      />
    </Svg>
  );
}

export function MaterialSymbolsDeleteOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M7 21q-.825 0-1.412-.587T5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zM9 17h2V8H9zm4 0h2V8h-2zM7 6v13z"
      />
    </Svg>
  );
}

export function MaterialSymbolsEditOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 19h1.425L16.2 9.225L14.775 7.8L5 17.575zm-2 2v-4.25L16.2 3.575q.3-.275.663-.425t.762-.15t.775.15t.65.45L20.425 5q.3.275.438.65T21 6.4q0 .4-.137.763t-.438.662L7.25 21zM19 6.4L17.6 5zm-3.525 2.125l-.7-.725L16.2 9.225z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightShieldPersonOutlineRounded(
  props: SvgProps,
) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 12.5q-1.263 0-2.132-.868T9 9.5t.868-2.132T12 6.5t2.132.868T15 9.5t-.868 2.132T12 12.5m0-1q.842 0 1.421-.579T14 9.5t-.579-1.421T12 7.5t-1.421.579T10 9.5t.579 1.421T12 11.5m0-7.356L6 6.375V11.1q0 1.504.442 2.894t1.246 2.573q.973-.505 2.037-.786T12 15.5t2.275.28t2.036.787q.804-1.183 1.247-2.573Q18 12.604 18 11.1V6.375zM12 16.5q-1.035 0-1.971.22q-.937.218-1.75.626q.763.904 1.7 1.56T12 19.9q1.085-.338 2.011-.994t1.691-1.56q-.813-.407-1.74-.627T12 16.5m0 4.342q-.136 0-.287-.025t-.28-.075Q8.48 19.617 6.74 16.926T5 11.1V6.817q0-.51.295-.923t.755-.6l5.385-2q.292-.106.565-.106t.566.106l5.384 2q.46.187.755.6t.295.923V11.1q0 3.135-1.74 5.826t-4.693 3.816q-.13.05-.28.075t-.287.025"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightFormatListBulletedRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M10.116 18.5q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143H19.5q.213 0 .356.144t.144.357t-.144.356t-.356.143zm0-6q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143H19.5q.213 0 .356.144t.144.357t-.144.356t-.356.143zm0-6q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143H19.5q.213 0 .356.144t.144.357t-.144.356t-.356.143zM5.327 19.327q-.547 0-.937-.39T4 18t.39-.937t.937-.39t.937.39t.39.937t-.39.937t-.937.39m0-6q-.547 0-.937-.39T4 12t.39-.937t.937-.39t.937.39t.39.937t-.39.937t-.937.39m0-6q-.547 0-.937-.39T4 6t.39-.937t.937-.39t.937.39t.39.937t-.39.937t-.937.39"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightGavelRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M4.616 19.5h10q.213 0 .356.143q.144.143.144.357t-.144.357t-.356.143h-10q-.214 0-.357-.143T4.115 20t.144-.357t.356-.143m4.322-5.602l-2.69-2.69q-.46-.46-.473-1.124t.447-1.143l.302-.322l5.008 4.958l-.321.321q-.46.46-1.137.46t-1.136-.46m6.64-4.367l-4.958-5.008l.322-.302q.478-.46 1.143-.447q.664.012 1.124.472l2.69 2.69q.46.46.46 1.137t-.46 1.137zm4.67 9.423L8.241 6.95l.708-.708l12.004 12.004q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightContactSupportOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M13 20.27L12.942 18H11.5q-3.127 0-5.313-2.186T4 10.5t2.187-5.313T11.5 3q1.564 0 2.928.586q1.364.585 2.383 1.604t1.604 2.382Q19 8.937 19 10.5q0 1.529-.449 2.937t-1.242 2.661t-1.9 2.31T13 20.269m1-1.919q1.775-1.5 2.888-3.512T18 10.5q0-2.725-1.888-4.612T11.5 4T6.888 5.888T5 10.5t1.888 4.613T11.5 17H14zm-2.467-2.779q.31 0 .523-.213t.213-.523t-.213-.523t-.523-.214q-.31 0-.523.214q-.214.213-.214.523t.213.523q.214.213.524.213m-.437-2.925h.885q.038-.615.236-.973q.198-.357.94-1.1q.432-.43.684-.879q.251-.448.251-1.028q0-1.083-.747-1.701t-1.807-.619q-.927 0-1.57.507q-.645.507-.945 1.209l.823.319q.202-.444.59-.809q.389-.364 1.102-.364q.848 0 1.253.461q.405.462.405 1.008q0 .502-.26.849q-.259.347-.667.755q-.721.635-.947 1.14t-.226 1.225m.404-1.471"
      />
    </Svg>
  );
}

export function RiExternalLinkLine(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M10 6v2H5v11h11v-5h2v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1zm11-3v8h-2V6.413l-7.793 7.794l-1.414-1.414L17.585 5H13V3z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightLockOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6.616 21q-.672 0-1.144-.472T5 19.385v-8.77q0-.67.472-1.143Q5.944 9 6.616 9H8V7q0-1.671 1.165-2.835Q10.329 3 12 3t2.836 1.165T16 7v2h1.385q.67 0 1.143.472q.472.472.472 1.144v8.769q0 .67-.472 1.143q-.472.472-1.143.472zm0-1h10.769q.269 0 .442-.173t.173-.442v-8.77q0-.269-.173-.442T17.385 10H6.615q-.269 0-.442.173T6 10.616v8.769q0 .269.173.442t.443.173M12 16.5q.633 0 1.066-.434q.434-.433.434-1.066t-.434-1.066T12 13.5t-1.066.434Q10.5 14.367 10.5 15t.434 1.066q.433.434 1.066.434M9 9h6V7q0-1.25-.875-2.125T12 4t-2.125.875T9 7zM6 20V10z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightPasswordRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M3 17.5h18q.213 0 .356.144t.144.357t-.144.356T21 18.5H3q-.213 0-.356-.144t-.144-.357t.144-.356T3 17.5m1-6.666l-.744 1.312q-.089.163-.265.207q-.178.045-.34-.044q-.161-.09-.205-.267q-.044-.179.048-.338l.744-1.312H1.75q-.192 0-.317-.125t-.125-.316t.125-.317t.317-.126h1.489l-.745-1.262q-.092-.16-.048-.338t.206-.267t.339-.044t.265.207L4 9.065l.744-1.261q.089-.163.266-.208t.338.045t.206.267t-.048.338L4.76 9.508h1.49q.192 0 .317.125t.125.316t-.125.317t-.317.126H4.761l.745 1.312q.092.16.048.338t-.206.267q-.161.089-.338.044q-.177-.044-.266-.207zm8 0l-.744 1.312q-.089.163-.266.207q-.177.045-.338-.044q-.162-.09-.206-.267q-.044-.179.048-.338l.744-1.312H9.75q-.192 0-.317-.125t-.125-.316t.125-.317t.317-.126h1.489l-.745-1.262q-.092-.16-.048-.338t.206-.267t.339-.044t.265.207L12 9.065l.744-1.261q.089-.163.266-.208t.338.045q.162.09.206.267t-.048.338l-.744 1.262h1.488q.192 0 .317.125t.125.316t-.125.317t-.317.126h-1.489l.745 1.312q.092.16.048.338t-.206.267t-.339.044t-.265-.207zm8 0l-.744 1.312q-.089.163-.266.207q-.177.045-.338-.044q-.162-.09-.206-.267q-.044-.179.048-.338l.744-1.312H17.75q-.192 0-.317-.125t-.125-.316t.125-.317t.317-.126h1.489l-.745-1.262q-.092-.16-.048-.338t.206-.267t.338-.044t.266.207L20 9.065l.744-1.261q.089-.163.266-.208t.338.045t.206.267t-.048.338l-.744 1.262h1.488q.192 0 .317.125t.125.316t-.125.317t-.317.126h-1.489l.745 1.312q.092.16.048.338t-.206.267t-.338.044t-.266-.207z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightSettingsAccessibility(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 3.808q-.71 0-1.201-.492q-.491-.491-.491-1.2q0-.71.491-1.202Q11.291.423 12 .423t1.201.492q.491.49.491 1.2t-.491 1.201q-.492.492-1.201.492M9.808 18.885V6.423q-1.558-.125-3.031-.346T4 5.539l.23-1q1.893.467 3.814.676q1.921.208 3.956.208t3.956-.208q1.921-.21 3.813-.676l.231 1q-1.304.317-2.777.538t-3.03.346v12.462h-1v-6.039h-2.385v6.039zM8 23.769q-.31 0-.54-.23T7.23 23t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.54t.54-.23t.54.23t.23.54t-.23.54t-.54.23"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightGroupOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M2.596 18.616v-1.647q0-.696.36-1.197q.361-.5.97-.8q1.301-.62 2.584-.988q1.282-.368 3.086-.368t3.087.368t2.584.988q.608.3.969.8q.36.501.36 1.197v1.647zm16 0v-1.693q0-.87-.352-1.641q-.351-.772-.998-1.324q.737.15 1.42.416q.682.267 1.35.599q.65.327 1.019.837t.369 1.113v1.693zm-9-7.231q-1.237 0-2.118-.882t-.882-2.119t.882-2.118t2.118-.882t2.119.882t.881 2.118t-.881 2.12t-2.119.88m7.27-3q0 1.238-.882 2.12t-2.118.88q-.064 0-.162-.014t-.162-.032q.509-.622.781-1.38q.273-.759.273-1.576t-.285-1.56t-.769-1.391q.081-.029.162-.038t.162-.009q1.237 0 2.118.882t.882 2.118m-13.27 9.232h12v-.647q0-.352-.176-.615t-.632-.504q-1.119-.598-2.36-.916t-2.832-.318t-2.833.318q-1.24.318-2.36.916q-.455.24-.631.504q-.176.263-.176.615zm6-7.231q.825 0 1.413-.588t.587-1.413t-.587-1.412t-1.413-.588t-1.412.588t-.588 1.412t.588 1.413t1.412.587m0-2"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightScreenshotFrame2Rounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M20.5 10q-.213 0-.357-.143T20 9.5V7.616q0-.231-.192-.424T19.385 7H17.5q-.213 0-.357-.143T17 6.5t.143-.357T17.5 6h1.885q.69 0 1.152.463T21 7.616V9.5q0 .214-.143.357T20.5 10m-17 0q-.213 0-.357-.143T3 9.5V7.616q0-.691.463-1.153T4.615 6H6.5q.214 0 .357.143T7 6.5t-.143.357T6.5 7H4.616q-.231 0-.424.192T4 7.616V9.5q0 .214-.143.357T3.5 10m14 8q-.213 0-.357-.143T17 17.5t.143-.357T17.5 17h1.885q.23 0 .423-.192t.192-.424V14.5q0-.213.143-.357T20.5 14t.357.143t.143.357v1.885q0 .69-.462 1.152T19.385 18zM4.615 18q-.69 0-1.153-.462T3 16.384V14.5q0-.213.143-.357T3.5 14t.357.143T4 14.5v1.885q0 .23.192.423t.423.192H6.5q.214 0 .357.143T7 17.5t-.143.357T6.5 18z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightDeleteOutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M7.616 20q-.667 0-1.141-.475T6 18.386V6h-.5q-.213 0-.356-.144T5 5.499t.144-.356T5.5 5H9q0-.31.23-.54t.54-.23h4.46q.31 0 .54.23T15 5h3.5q.213 0 .356.144t.144.357t-.144.356T18.5 6H18v12.385q0 .666-.475 1.14t-1.14.475zM17 6H7v12.385q0 .269.173.442t.443.173h8.769q.269 0 .442-.173t.173-.442zm-6.692 11q.213 0 .357-.144t.143-.356v-8q0-.213-.144-.356T10.307 8t-.356.144t-.143.356v8q0 .213.144.356q.144.144.356.144m3.385 0q.213 0 .356-.144t.143-.356v-8q0-.213-.144-.356Q13.904 8 13.692 8q-.213 0-.357.144t-.143.356v8q0 .213.144.356t.357.144M7 6v13z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightLogoutRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5.616 20q-.691 0-1.153-.462T4 18.384V5.616q0-.691.463-1.153T5.616 4h5.903q.214 0 .357.143t.143.357t-.143.357t-.357.143H5.616q-.231 0-.424.192T5 5.616v12.769q0 .23.192.423t.423.192h5.904q.214 0 .357.143t.143.357t-.143.357t-.357.143zm12.444-7.5H9.692q-.213 0-.356-.143T9.192 12t.143-.357t.357-.143h8.368l-1.971-1.971q-.141-.14-.15-.338q-.01-.199.15-.364q.159-.165.353-.168q.195-.003.36.162l2.614 2.613q.242.243.242.566t-.243.566l-2.613 2.613q-.146.146-.347.153t-.366-.159q-.16-.165-.157-.357t.162-.35z"
      />
    </Svg>
  );
}

export function MaterialSymbolsAddAPhoto(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M19 7V5h-2V3h2V1h2v2h2v2h-2v2zm-8 10.5q1.875 0 3.188-1.312T15.5 13t-1.312-3.187T11 8.5T7.813 9.813T6.5 13t1.313 3.188T11 17.5m0-2q-1.05 0-1.775-.725T8.5 13t.725-1.775T11 10.5t1.775.725T13.5 13t-.725 1.775T11 15.5M3 21q-.825 0-1.412-.587T1 19V7q0-.825.588-1.412T3 5h3.15L8 3h7v4h2v2h4v10q0 .825-.587 1.413T19 21z"
      />
    </Svg>
  );
}

export function MaterialSymbolsPhotoLibraryRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M9 14h10l-3.45-4.5l-2.3 3l-1.55-2zm-1 4q-.825 0-1.412-.587T6 16V4q0-.825.588-1.412T8 2h12q.825 0 1.413.588T22 4v12q0 .825-.587 1.413T20 18zm0-2h12V4H8zm-4 6q-.825 0-1.412-.587T2 20V6h2v14h14v2zM8 4h12v12H8z"
      />
    </Svg>
  );
}

export function MaterialSymbolsAndroidCamera(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 18q2.075 0 3.538-1.462Q17 15.075 17 13q0-2.075-1.462-3.538Q14.075 8 12 8Q9.925 8 8.463 9.462Q7 10.925 7 13q0 2.075 1.463 3.538Q9.925 18 12 18Zm0-2q-1.25 0-2.125-.875T9 13q0-1.25.875-2.125T12 10q1.25 0 2.125.875T15 13q0 1.25-.875 2.125T12 16Zm6-6q.425 0 .712-.288Q19 9.425 19 9t-.288-.713Q18.425 8 18 8t-.712.287Q17 8.575 17 9t.288.712Q17.575 10 18 10ZM4 21q-.825 0-1.412-.587Q2 19.825 2 19V7q0-.825.588-1.412Q3.175 5 4 5h3.15L8.7 3.325q.15-.15.337-.238Q9.225 3 9.425 3h5.15q.2 0 .388.087q.187.088.337.238L16.85 5H20q.825 0 1.413.588Q22 6.175 22 7v12q0 .825-.587 1.413Q20.825 21 20 21Z"
      />
    </Svg>
  );
}

export function MaterialSymbolsPersonCheck(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M17.55 12L14 8.45l1.425-1.4l2.125 2.125l4.25-4.25l1.4 1.425zM9 12q-1.65 0-2.825-1.175T5 8t1.175-2.825T9 4t2.825 1.175T13 8t-1.175 2.825T9 12m-8 8v-2.8q0-.85.438-1.562T2.6 14.55q1.55-.775 3.15-1.162T9 13t3.25.388t3.15 1.162q.725.375 1.163 1.088T17 17.2V20z"
      />
    </Svg>
  );
}

export function MaterialSymbolsFingerprint(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12.025 4.475q2.65 0 5 1.138T20.95 8.9q.175.225.113.4t-.213.3t-.35.113t-.35-.213q-1.375-1.95-3.537-2.987t-4.588-1.038t-4.55 1.038T3.95 9.5q-.15.225-.35.25t-.35-.1q-.175-.125-.213-.312t.113-.388q1.55-2.125 3.888-3.3t4.987-1.175m0 2.35q3.375 0 5.8 2.25t2.425 5.575q0 1.25-.887 2.088t-2.163.837t-2.187-.837t-.913-2.088q0-.825-.612-1.388t-1.463-.562t-1.463.563t-.612 1.387q0 2.425 1.438 4.05t3.712 2.275q.225.075.3.25t.025.375q-.05.175-.2.3t-.375.075q-2.6-.65-4.25-2.588T8.95 14.65q0-1.25.9-2.1t2.175-.85t2.175.85t.9 2.1q0 .825.625 1.388t1.475.562t1.45-.562t.6-1.388q0-2.9-2.125-4.875T12.05 7.8T6.975 9.775t-2.125 4.85q0 .6.113 1.5t.537 2.1q.075.225-.012.4t-.288.25t-.387-.012t-.263-.288q-.375-.975-.537-1.937T3.85 14.65q0-3.325 2.413-5.575t5.762-2.25m0-4.8q1.6 0 3.125.387t2.95 1.113q.225.125.263.3t-.038.35t-.25.275t-.425-.025q-1.325-.675-2.738-1.037t-2.887-.363q-1.45 0-2.85.338T6.5 4.425q-.2.125-.4.063t-.3-.263t-.05-.362t.25-.288q1.4-.75 2.925-1.15t3.1-.4m0 7.225q2.325 0 4 1.563T17.7 14.65q0 .225-.137.363t-.363.137q-.2 0-.35-.137t-.15-.363q0-1.875-1.388-3.137t-3.287-1.263t-3.262 1.263T7.4 14.65q0 2.025.7 3.438t2.05 2.837q.15.15.15.35t-.15.35t-.35.15t-.35-.15q-1.475-1.55-2.262-3.162T6.4 14.65q0-2.275 1.65-3.838t3.975-1.562M12 14.15q.225 0 .363.15t.137.35q0 1.875 1.35 3.075t3.15 1.2q.15 0 .425-.025t.575-.075q.225-.05.388.063t.212.337q.05.2-.075.35t-.325.2q-.45.125-.787.138t-.413.012q-2.225 0-3.863-1.5T11.5 14.65q0-.2.138-.35t.362-.15"
      />
    </Svg>
  );
}

export function MaterialSymbolsNoAccounts(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M15.2 10.95L10.55 6.3q.35-.15.713-.225T12 6q1.475 0 2.488 1.013T15.5 9.5q0 .375-.075.738t-.225.712M5.85 17.1q1.275-.975 2.85-1.537T12 15q.45 0 .863.038t.862.112l-2.2-2.2q-1.175-.15-2.012-.987T8.525 9.95L5.675 7.1q-.8 1.025-1.237 2.263T4 12q0 1.475.488 2.775T5.85 17.1m12.45-.2q.8-1.025 1.25-2.262T20 12q0-3.325-2.337-5.663T12 4q-1.4 0-2.637.45T7.1 5.7zM12 22q-2.05 0-3.875-.788t-3.187-2.15t-2.15-3.187T2 12q0-2.075.788-3.887t2.15-3.175t3.187-2.15T12 2q2.075 0 3.888.788t3.174 2.15t2.15 3.175T22 12q0 2.05-.788 3.875t-2.15 3.188t-3.175 2.15T12 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsLocationHomeRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 15q1.25 0 2.125-.875T15 12t-.875-2.125T12 9t-2.125.875T9 12t.875 2.125T12 15m0 1q-1.45 0-2.812.413T6.6 17.6q-.3.175-.45.475t-.15.65V19h12v-.275q0-.35-.15-.65t-.45-.475q-1.225-.775-2.587-1.187T12 16m-6 5q-.825 0-1.412-.587T4 19v-9q0-.475.213-.9t.587-.7l6-4.5q.525-.4 1.2-.4t1.2.4l6 4.5q.375.275.588.7T20 10v9q0 .825-.588 1.413T18 21z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightDateRangeOutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M8 13.885q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23m4 0q-.31 0-.54-.23t-.23-.54t.23-.539t.54-.23t.54.23t.23.54t-.23.539t-.54.23M5.616 21q-.691 0-1.153-.462T4 19.385V6.615q0-.69.463-1.152T5.616 5h1.769V3.308q0-.233.153-.386t.385-.153t.386.153t.153.386V5h7.154V3.27q0-.214.143-.358t.357-.143t.356.143t.144.357V5h1.769q.69 0 1.153.463T20 6.616v12.769q0 .69-.462 1.153T18.384 21zm0-1h12.769q.23 0 .423-.192t.192-.424v-8.768H5v8.769q0 .23.192.423t.423.192M5 9.615h14v-3q0-.23-.192-.423T18.384 6H5.616q-.231 0-.424.192T5 6.616zm0 0V6z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightBadgeOutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6.308 17.423h5.384v-.142q0-.34-.186-.63t-.521-.451q-.481-.206-.974-.309q-.494-.103-1.011-.103t-1.01.103t-.975.309q-.334.16-.52.45t-.187.63zm8.134-1.538h3.116q.191 0 .317-.126q.125-.125.125-.316t-.125-.317t-.317-.126h-3.116q-.191 0-.317.125q-.125.125-.125.317t.125.317t.317.125M8.996 15q.494 0 .845-.347q.351-.346.351-.84t-.346-.847t-.841-.35t-.846.346t-.351.841t.346.846t.841.351m5.447-1.5h3.116q.191 0 .317-.125q.125-.125.125-.316t-.125-.318t-.317-.125h-3.116q-.191 0-.317.125q-.125.125-.125.316t.125.317t.317.126M4.616 21q-.691 0-1.153-.462T3 19.385v-9.77q0-.69.463-1.152T4.615 8H10V4q0-.413.294-.706T11 3h2q.413 0 .706.294T14 4v4h5.385q.69 0 1.152.463T21 9.616v9.769q0 .69-.463 1.153T19.385 21zm0-1h14.769q.269 0 .442-.173t.173-.442v-9.77q0-.269-.173-.442T19.385 9H14v.77q0 .401-.299.7t-.701.3h-2q-.402 0-.701-.3T10 9.77V9H4.616q-.27 0-.443.173T4 9.616v9.769q0 .269.173.442t.443.173M11 9.77h2V4h-2zm1 4.73"
      />
    </Svg>
  );
}

export function MaterialSymbolsDirectionsWalkRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m10.9 14.9l-1.625 7.3q-.075.35-.363.575T8.25 23q-.5 0-.8-.375t-.2-.85L9.8 8.9L8 9.6V12q0 .425-.288.713T7 13t-.712-.288T6 12V8.95q0-.3.163-.537T6.6 8.05l4.45-1.9q.35-.15.738-.175t.737.1t.663.35T13.7 7l1 1.6q.325.5.763.95t.987.775q.35.2.775.363t.85.237q.4.075.663.363T19 12t-.3.7t-.725.225q-1.4-.2-2.513-.875t-1.937-1.625L12.9 13.5l1.8 1.7q.15.15.225.338t.075.387V22q0 .425-.288.713T14 23t-.712-.288T13 22v-5.5zm2.6-9.4q-.825 0-1.412-.587T11.5 3.5t.588-1.412T13.5 1.5t1.413.588T15.5 3.5t-.587 1.413T13.5 5.5"
      />
    </Svg>
  );
}

export function MaterialSymbolsCheckCircleRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m10.6 13.8l-2.15-2.15q-.275-.275-.7-.275t-.7.275t-.275.7t.275.7L9.9 15.9q.3.3.7.3t.7-.3l5.65-5.65q.275-.275.275-.7t-.275-.7t-.7-.275t-.7.275zM12 22q-2.075 0-3.9-.788t-3.175-2.137T2.788 15.9T2 12t.788-3.9t2.137-3.175T8.1 2.788T12 2t3.9.788t3.175 2.137T21.213 8.1T22 12t-.788 3.9t-2.137 3.175t-3.175 2.138T12 22"
      />
    </Svg>
  );
}

export function MaterialSymbolsWallet(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6 20q-1.65 0-2.825-1.175T2 16V8q0-1.65 1.175-2.825T6 4h12q1.65 0 2.825 1.175T22 8v8q0 1.65-1.175 2.825T18 20zM6 8h12q.55 0 1.05.125t.95.4V8q0-.825-.587-1.412T18 6H6q-.825 0-1.412.588T4 8v.525q.45-.275.95-.4T6 8m-1.85 3.25l11.125 2.7q.225.05.45 0t.425-.2l3.475-2.9q-.275-.375-.7-.612T18 10H6q-.65 0-1.137.338t-.713.912"
      />
    </Svg>
  );
}

export function MaterialSymbolsHowToVoteRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 22q-.825 0-1.412-.587T3 20v-3.8q0-.35.125-.7t.375-.625l1.55-1.75q.275-.325.713-.337t.737.287q.275.275.3.675t-.25.7L5.175 16h13.65L17.5 14.5q-.275-.3-.25-.7t.3-.675q.3-.3.738-.288t.712.338l1.5 1.7q.25.275.375.625t.125.7V20q0 .825-.587 1.413T19 22zm5.6-7.6l-3.475-3.525Q6.55 10.3 6.55 9.45t.575-1.425l4.9-4.9q.575-.575 1.425-.575t1.425.575L18.4 6.6q.575.575.588 1.412t-.563 1.413l-5 5q-.575.575-1.412.563T10.6 14.4M17 8l-3.55-3.5L8.5 9.45l3.55 3.5z"
      />
    </Svg>
  );
}

export function MaterialSymbolsBallotRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M16 10q.425 0 .713-.288T17 9t-.288-.712T16 8h-3q-.425 0-.712.288T12 9t.288.713T13 10zm0 6q.425 0 .713-.288T17 15t-.288-.712T16 14h-3q-.425 0-.712.288T12 15t.288.713T13 16zm-7-5q.825 0 1.413-.587T11 9t-.587-1.412T9 7t-1.412.588T7 9t.588 1.413T9 11m0 6q.825 0 1.413-.587T11 15t-.587-1.412T9 13t-1.412.588T7 15t.588 1.413T9 17m-4 4q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z"
      />
    </Svg>
  );
}

export function MaterialSymbolsDirectionsCarRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6 19v.5q0 .625-.437 1.063T4.5 21t-1.062-.437T3 19.5v-7.15q0-.175.025-.35t.075-.325L4.975 6.35q.2-.6.725-.975T6.875 5h10.25q.65 0 1.175.375t.725.975l1.875 5.325q.05.15.075.325t.025.35v7.15q0 .625-.437 1.063T19.5 21t-1.062-.437T18 19.5V19zm-.2-9h12.4l-1.05-3H6.85zm1.7 6q.625 0 1.063-.437T9 14.5t-.437-1.062T7.5 13t-1.062.438T6 14.5t.438 1.063T7.5 16m9 0q.625 0 1.063-.437T18 14.5t-.437-1.062T16.5 13t-1.062.438T15 14.5t.438 1.063T16.5 16"
      />
    </Svg>
  );
}

export function MaterialSymbolsBadgeRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6 18h6v-.45q0-.425-.238-.788T11.1 16.2q-.5-.225-1.012-.337T9 15.75t-1.088.113T6.9 16.2q-.425.2-.663.563T6 17.55zm8.75-1.5h2.5q.325 0 .538-.213T18 15.75t-.213-.537T17.25 15h-2.5q-.325 0-.537.213T14 15.75t.213.538t.537.212M9 15q.625 0 1.063-.437T10.5 13.5t-.437-1.062T9 12t-1.062.438T7.5 13.5t.438 1.063T9 15m5.75-1.5h2.5q.325 0 .538-.213T18 12.75t-.213-.537T17.25 12h-2.5q-.325 0-.537.213T14 12.75t.213.538t.537.212M4 22q-.825 0-1.412-.587T2 20V9q0-.825.588-1.412T4 7h5V4q0-.825.588-1.412T11 2h2q.825 0 1.413.588T15 4v3h5q.825 0 1.413.588T22 9v11q0 .825-.587 1.413T20 22zm7-13h2V4h-2z"
      />
    </Svg>
  );
}

export function MaterialSymbolsEngineeringRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M1.05 20v-1.8q0-.825.425-1.55t1.175-1.1q1.275-.65 2.875-1.1T9.05 14t3.525.45t2.875 1.1q.75.375 1.175 1.1t.425 1.55V20q0 .425-.288.713T16.05 21h-14q-.425 0-.712-.288T1.05 20m8-7q-1.65 0-2.825-1.175T5.05 9H4.8q-.225 0-.362-.137T4.3 8.5t.138-.363T4.8 8h.25q0-1.125.55-2.025T7.05 4.55v.95q0 .225.138.363T7.55 6t.363-.137t.137-.363V4.15q.225-.075.475-.112T9.05 4t.525.038t.475.112V5.5q0 .225.138.363T10.55 6t.363-.137t.137-.363v-.95q.9.525 1.45 1.425T13.05 8h.25q.225 0 .363.138t.137.362t-.137.363T13.3 9h-.25q0 1.65-1.175 2.825T9.05 13m0-2q.825 0 1.413-.587T11.05 9h-4q0 .825.588 1.413T9.05 11m7.425 3.6l-.075-.35q-.15-.05-.287-.112t-.263-.188l-.3.1q-.175.05-.337 0t-.263-.225l-.1-.175q-.1-.15-.062-.325t.162-.3l.25-.225v-.6l-.25-.225q-.125-.125-.162-.3t.062-.325l.1-.175q.1-.175.263-.225t.337 0l.3.1q.1-.1.25-.175t.3-.125l.075-.35q.05-.175.175-.288t.3-.112h.2q.175 0 .3.113t.175.287l.075.35q.15.05.3.125t.25.175l.3-.1q.175-.05.338 0t.262.225l.1.175q.1.15.063.325t-.163.3l-.25.225v.6l.25.225q.125.125.163.3t-.063.325l-.1.175q-.1.175-.262.225t-.338 0l-.3-.1q-.125.125-.262.188t-.288.112l-.075.35q-.05.175-.175.288t-.3.112h-.2q-.175 0-.3-.112t-.175-.288m.575-1.35q.3 0 .525-.225t.225-.525t-.225-.525t-.525-.225t-.525.225t-.225.525t.225.525t.525.225m1.7-3.8l-.1-.5q-.225-.075-.413-.187T17.9 8.5l-.525.175q-.225.075-.45-.012t-.35-.288l-.15-.25q-.125-.2-.088-.437t.238-.413L17 6.9q-.05-.125-.05-.2v-.4q0-.075.05-.2l-.425-.375q-.2-.175-.238-.413t.088-.437l.15-.25q.125-.2.35-.288t.45-.012l.525.175q.15-.15.338-.262t.412-.188l.1-.5q.05-.25.238-.4t.437-.15h.25q.25 0 .438.15t.237.4l.1.5q.225.075.413.188t.337.262l.525-.175q.225-.075.45.013t.35.287l.15.25q.125.2.088.438t-.238.412L22.1 6.1q.05.125.05.2v.4q0 .075-.05.2l.425.375q.2.175.238.413t-.088.437l-.15.25q-.125.2-.35.288t-.45.012L21.2 8.5q-.15.15-.337.262t-.413.188l-.1.5q-.05.25-.238.4t-.437.15h-.25q-.25 0-.437-.15t-.238-.4m.8-1.7q.525 0 .888-.362T20.8 6.5t-.363-.888t-.887-.362t-.888.363t-.362.887t.363.888t.887.362"
      />
    </Svg>
  );
}

export function MaterialSymbolsNotificationsActiveRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5 19q-.425 0-.712-.288T4 18t.288-.712T5 17h1v-7q0-2.075 1.25-3.687T10.5 4.2v-.7q0-.625.438-1.062T12 2t1.063.438T13.5 3.5v.7q2 .5 3.25 2.113T18 10v7h1q.425 0 .713.288T20 18t-.288.713T19 19zm7 3q-.825 0-1.412-.587T10 20h4q0 .825-.587 1.413T12 22M3 10q-.425 0-.712-.325t-.238-.75q.2-1.875 1.05-3.488t2.175-2.812q.325-.275.738-.25t.662.375t.2.75t-.375.7q-.975.925-1.6 2.15T4.075 9q-.05.425-.35.713T3 10m18 0q-.425 0-.725-.288T19.925 9q-.2-1.425-.825-2.65T17.5 4.2q-.325-.3-.375-.7t.2-.75t.663-.375t.737.25q1.325 1.2 2.175 2.812t1.05 3.488q.05.425-.237.75T21 10"
      />
    </Svg>
  );
}

export function MaterialSymbolsGroupsRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M1 18q-.425 0-.712-.288T0 17v-.575q0-1.075 1.1-1.75T4 14q.325 0 .625.013t.575.062q-.35.525-.525 1.1t-.175 1.2V18zm6 0q-.425 0-.712-.288T6 17v-.625q0-.8.438-1.463t1.237-1.162T9.588 13T12 12.75q1.325 0 2.438.25t1.912.75t1.225 1.163t.425 1.462V17q0 .425-.287.713T17 18zm12.5 0v-1.625q0-.65-.162-1.225t-.488-1.075q.275-.05.563-.062T20 14q1.8 0 2.9.663t1.1 1.762V17q0 .425-.288.713T23 18zM4 13q-.825 0-1.412-.587T2 11q0-.85.588-1.425T4 9q.85 0 1.425.575T6 11q0 .825-.575 1.413T4 13m16 0q-.825 0-1.412-.587T18 11q0-.85.588-1.425T20 9q.85 0 1.425.575T22 11q0 .825-.575 1.413T20 13m-8-1q-1.25 0-2.125-.875T9 9q0-1.275.875-2.137T12 6q1.275 0 2.138.863T15 9q0 1.25-.862 2.125T12 12"
      />
    </Svg>
  );
}

export function IonEnterOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M176 176v-40a40 40 0 0 1 40-40h208a40 40 0 0 1 40 40v240a40 40 0 0 1-40 40H216a40 40 0 0 1-40-40v-40"
      />
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="m272 336l80-80l-80-80M48 256h288"
      />
    </Svg>
  );
}

export function IonExitOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 512 512" {...props}>
      <Path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M320 176v-40a40 40 0 0 0-40-40H88a40 40 0 0 0-40 40v240a40 40 0 0 0 40 40h192a40 40 0 0 0 40-40v-40m64-160l80 80l-80 80m-193-80h273"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightPaymentsOutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M13.5 12.423q-.846 0-1.423-.577t-.577-1.423T12.077 9t1.423-.577T14.923 9t.577 1.423t-.577 1.423t-1.423.577m-6.192 3.193q-.667 0-1.141-.475q-.475-.475-.475-1.141V6.846q0-.666.475-1.14t1.14-.475h12.385q.667 0 1.141.474t.475 1.141V14q0 .666-.475 1.14q-.474.476-1.14.476zm1-1h10.384q0-.672.475-1.144q.474-.472 1.14-.472V7.846q-.67 0-1.142-.474q-.473-.475-.473-1.141H8.308q0 .671-.475 1.143q-.474.472-1.14.472V13q.67 0 1.143.475q.472.474.472 1.14m9.538 4H4.308q-.667 0-1.141-.474q-.475-.475-.475-1.141V8.692q0-.212.144-.356t.357-.144t.356.144t.143.356V17q0 .23.192.423q.193.193.424.193h13.538q.213 0 .356.143q.144.144.144.357t-.144.356t-.356.144m-10.538-4h-.616V6.23h.616q-.25 0-.433.183t-.183.432V14q0 .25.183.433t.433.183"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightEngineeringOutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M1.916 19.385v-.839q0-.652.348-1.165t.982-.831q1.217-.611 2.702-.985q1.485-.373 2.968-.373t2.967.373t2.702.985q.634.317.982.83q.349.514.349 1.166v.839q0 .348-.23.577q-.23.23-.578.23H2.723q-.348 0-.578-.23t-.23-.577m1-.193h12v-.646q0-.41-.233-.673t-.574-.446q-.939-.488-2.351-.861q-1.413-.374-2.841-.374q-1.43 0-2.842.374q-1.412.373-2.351.861q-.34.183-.574.446q-.234.264-.234.673zm6-6.23q-1.284 0-2.142-.858t-.857-2.258h-.212q-.167 0-.276-.108q-.109-.11-.109-.276t.109-.276t.276-.109h.212q.038-.76.319-1.38q.28-.622.911-1.185v.95q0 .167.109.276q.109.108.276.108t.276-.108t.109-.276V6.15q.205-.075.465-.132q.26-.056.535-.056t.534.056t.466.132v1.312q0 .167.108.276q.109.108.276.108t.276-.108t.109-.276v-.95q.65.563.92 1.184q.272.621.31 1.381h.212q.167 0 .276.109q.108.108.108.276t-.108.276t-.276.108h-.212q0 1.4-.857 2.258q-.858.858-2.143.858m0-1q.864 0 1.432-.569q.568-.568.568-1.432h-4q0 .864.569 1.432t1.431.569m7.502 2.542l-.036-.37q-.189-.05-.394-.16t-.349-.255l-.357.158q-.137.05-.26.01q-.125-.04-.206-.177l-.042-.08q-.08-.13-.053-.266q.028-.137.153-.223l.308-.225q-.039-.114-.039-.208v-.406q0-.085.039-.217l-.308-.225q-.125-.087-.153-.223q-.028-.137.053-.268l.042-.078q.081-.137.205-.177q.124-.041.26.009l.359.158q.138-.139.345-.252q.208-.113.397-.163l.036-.37q.031-.136.137-.24q.106-.102.242-.102h.085q.136 0 .242.103t.136.24l.037.369q.189.05.396.163t.347.252l.357-.158q.137-.05.26-.01q.125.04.206.178l.042.078q.08.131.053.268q-.028.136-.153.223l-.308.225q.039.132.039.217v.406q0 .094-.039.208l.308.225q.125.086.153.223q.028.136-.053.267l-.042.079q-.081.136-.205.177t-.26-.01l-.358-.158q-.145.145-.35.255q-.204.11-.393.16l-.036.37q-.031.137-.137.24t-.242.102h-.085q-.136 0-.242-.103q-.106-.102-.137-.24m.422-1.1q.377 0 .64-.262q.263-.264.263-.641t-.263-.64t-.64-.264t-.641.264q-.263.263-.263.64t.263.64t.64.264m1.989-4.358l-.042-.404q-.283-.055-.595-.226q-.313-.17-.501-.416l-.41.175q-.148.056-.287.007t-.225-.191l-.053-.097q-.087-.142-.06-.293q.029-.151.171-.249l.348-.26q-.05-.144-.07-.296q-.018-.152-.018-.296t.019-.296t.069-.296l-.348-.26q-.142-.098-.17-.249t.058-.293l.054-.096q.087-.143.225-.192t.287.007l.41.175q.188-.246.5-.416q.313-.17.596-.226l.042-.404q.03-.154.151-.265q.12-.112.274-.112h.096q.154 0 .274.112q.12.111.151.265l.043.404q.282.056.595.226q.312.17.5.416l.41-.175q.148-.056.287-.007t.225.192l.054.096q.086.142.058.293t-.17.249l-.348.26q.05.144.07.296q.019.152.019.296t-.02.296t-.069.296l.348.26q.142.098.17.249t-.058.293l-.054.096q-.087.143-.225.192t-.287-.007L20.911 8q-.188.246-.5.416q-.313.17-.596.226l-.042.404q-.03.154-.151.266q-.12.111-.274.111h-.096q-.154 0-.274-.111q-.12-.112-.151-.266m.473-1.18q.583 0 .974-.392q.392-.391.392-.974t-.392-.974t-.974-.391t-.974.391t-.391.974t.391.974q.391.392.974.392M8.915 19.192"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightHomePinOutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M9.462 12.654h1.692v-2.365h1.692v2.365h1.692V8.596L12 6.904L9.461 8.596zM12 19.677q2.82-2.454 4.458-4.991t1.638-4.39q0-2.744-1.737-4.53Q14.62 3.981 12 3.981T7.641 5.766t-1.737 4.53q0 1.852 1.638 4.39T12 19.677m0 .879q-.235 0-.47-.077t-.432-.25q-1.067-.981-2.164-2.185q-1.096-1.203-1.99-2.493t-1.468-2.633t-.572-2.622q0-3.173 2.066-5.234Q9.037 3 12 3t5.03 2.062q2.066 2.061 2.066 5.234q0 1.279-.572 2.613q-.572 1.333-1.458 2.632q-.885 1.3-1.981 2.494T12.92 20.21q-.198.173-.442.26t-.479.086m0-10.44"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightHomeOutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M6 19h3.692v-5.077q0-.343.233-.575q.232-.233.575-.233h3q.343 0 .576.233q.232.232.232.575V19H18v-8.692q0-.154-.067-.28t-.183-.22L12.366 5.75q-.154-.134-.366-.134t-.365.134L6.25 9.808q-.115.096-.183.22t-.067.28zm-1 0v-8.692q0-.384.172-.727t.474-.565l5.385-4.078q.423-.323.966-.323t.972.323l5.385 4.077q.303.222.474.566q.172.343.172.727V19q0 .402-.299.701T18 20h-3.884q-.344 0-.576-.232q-.232-.233-.232-.576v-5.076h-2.616v5.076q0 .344-.232.576T9.885 20H6q-.402 0-.701-.299T5 19m7-6.711"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightDeployedCodeAccountOutlineRounded(
  props: SvgProps,
) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M3 17.577v-.608q0-.69.348-1.194t.983-.802q1.442-.711 2.737-1.034t2.938-.323h.096q.203 0 .349.142t.145.378q0 .199-.146.339t-.348.14h-.096q-1.679 0-2.931.345q-1.252.344-2.267.89q-.456.24-.632.504q-.176.263-.176.615v.646h6.096q.213 0 .357.144q.143.144.143.357t-.143.356t-.357.144H4.04q-.441 0-.74-.3q-.3-.299-.3-.739m13.557 2.371q-.16 0-.32-.037t-.3-.13l-2.347-1.365q-.285-.164-.437-.44Q13 17.698 13 17.37v-2.717q0-.328.153-.604q.152-.276.437-.44l2.346-1.366q.141-.093.301-.13q.161-.037.322-.037t.308.047t.287.12L19.5 13.61q.287.164.451.44t.165.604v2.717q0 .328-.165.604q-.164.277-.451.44l-2.346 1.368q-.137.079-.287.122t-.31.043M10 11.385q-1.237 0-2.119-.882T7 8.385t.881-2.12T10 5.386t2.119.88t.881 2.12t-.881 2.118t-2.119.882m0-1q.825 0 1.413-.588T12 8.385t-.587-1.413T10 6.385t-1.412.587T8 8.385t.588 1.412t1.412.588m4.342 3.773l2.216 1.279l2.215-1.28l-2.215-1.272zm2.658 4.7l2.23-1.288v-2.724L17 16.191zm-3.116-1.281l2.231 1.306v-2.667l-2.23-1.325z"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightSupervisorAccountOutline(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M16.885 13.616q-.82 0-1.41-.591t-.59-1.41t.59-1.41t1.41-.59q.819 0 1.41.59q.59.591.59 1.41q0 .82-.59 1.41q-.591.59-1.41.59m-4.5 5v-.9q0-.465.232-.843q.232-.379.66-.545q.845-.356 1.748-.534q.904-.177 1.86-.177q.916 0 1.821.177q.905.178 1.786.534q.428.166.66.545q.232.378.232.844v.9zm-2.77-7.23q-1.237 0-2.118-.882t-.881-2.118t.88-2.12t2.12-.88t2.118.88t.882 2.12t-.882 2.118t-2.118.882m-7 7.23V16.97q0-.648.357-1.192q.358-.544.973-.804q1.327-.673 2.756-1.015t2.914-.342q.605 0 1.211.063t1.212.167l-.427.446l-.427.447q-.393-.077-.785-.1t-.784-.023q-1.354 0-2.675.292t-2.518.942q-.327.183-.567.456t-.24.663v.646h6v1zm7-8.23q.825 0 1.412-.588t.588-1.412t-.588-1.413t-1.412-.587t-1.413.587t-.587 1.413t.587 1.412t1.413.588"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightStickyNote2Rounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="m14 19l5-5h-4.192q-.344 0-.576.232t-.232.576zm-8.385 1q-.666 0-1.14-.475T4 18.386V5.615q0-.666.475-1.14T5.615 4h12.77q.666 0 1.14.475T20 5.615v8.002q0 .332-.13.632t-.349.518l-4.754 4.754q-.217.218-.517.348t-.633.131zm2.77-6.539H11.5q.213 0 .356-.143q.144-.144.144-.357t-.144-.356t-.356-.143H8.385q-.213 0-.357.144t-.143.356t.143.356t.357.144m0-3.962h7.23q.213 0 .357-.144t.144-.357t-.144-.356t-.356-.143H8.385q-.213 0-.357.144t-.143.357t.143.356t.357.143"
      />
    </Svg>
  );
}

export function MaterialSymbolsLightStickyNote2OutlineRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M5.616 19H14v-4.192q0-.344.232-.576t.576-.232H19V5.616q0-.27-.173-.443T18.385 5H5.615q-.269 0-.442.173T5 5.616v12.769q0 .269.173.442t.443.173m0 1q-.667 0-1.141-.475T4 18.386V5.615q0-.666.475-1.14T5.615 4h12.77q.666 0 1.14.475T20 5.615v8.002q0 .332-.13.632t-.349.518l-4.754 4.754q-.217.218-.517.348t-.633.131zm5.884-6.538H8.385q-.213 0-.357-.144q-.143-.144-.143-.357t.143-.356t.357-.143H11.5q.213 0 .356.144t.144.356t-.144.356t-.356.144M15.616 9.5H8.385q-.213 0-.357-.144t-.143-.357t.143-.356t.357-.143h7.23q.213 0 .357.144t.144.357t-.144.356t-.356.143M5 19V5z"
      />
    </Svg>
  );
}

export function MaterialSymbolsMoreVert(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 20q-.825 0-1.412-.587T10 18t.588-1.412T12 16t1.413.588T14 18t-.587 1.413T12 20m0-6q-.825 0-1.412-.587T10 12t.588-1.412T12 10t1.413.588T14 12t-.587 1.413T12 14m0-6q-.825 0-1.412-.587T10 6t.588-1.412T12 4t1.413.588T14 6t-.587 1.413T12 8"
      />
    </Svg>
  );
}

export function MaterialSymbolsShieldPersonRounded(props: SvgProps) {
  return (
    <Svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
      <Path
        fill="currentColor"
        d="M12 13q1.45 0 2.475-1.025T15.5 9.5t-1.025-2.475T12 6T9.525 7.025T8.5 9.5t1.025 2.475T12 13m0 6.9q1.475-.475 2.613-1.487t1.987-2.288q-1.075-.55-2.238-.837T12 15t-2.363.288t-2.237.837q.85 1.275 1.988 2.288T12 19.9m0 2q-.175 0-.325-.025t-.3-.075Q8 20.675 6 17.638T4 11.1V6.375q0-.625.363-1.125t.937-.725l6-2.25q.35-.125.7-.125t.7.125l6 2.25q.575.225.938.725T20 6.375V11.1q0 3.5-2 6.538T12.625 21.8q-.15.05-.3.075T12 21.9"
      />
    </Svg>
  );
}
