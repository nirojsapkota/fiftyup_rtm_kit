import { createGlobalStyle } from 'styled-components';

const Museo500Woff =
  'https://fonts.resources.revtech.media/museo500-regular-webfont.woff';
const Museo500Ttf =
  'https://fonts.resources.revtech.media/museo500-regular-webfont.ttf';
const Museo900Woff =
  'https://fonts.resources.revtech.media/museo900-regular-webfont.woff';
const Museo900Ttf =
  'https://fonts.resources.revtech.media./museo900-regular-webfont.ttf';
const MuseoSans300Woff =
  'https://fonts.resources.revtech.media/museosans_300-webfont.woff';
const MuseoSans300Ttf =
  'https://fonts.resources.revtech.media/museosans_300-webfont.ttf';
const MuseoSans500Woff =
  'https://fonts.resources.revtech.media/museosans_500-webfont.woff';
const MuseoSans500Ttf =
  'https://fonts.resources.revtech.media/museosans_500-webfont.ttf';
const MuseoSans900Woff =
  'https://fonts.resources.revtech.media/museosans_900-webfont.woff';
const MuseoSans900Ttf =
  'https://fonts.resources.revtech.media/museosans_900-webfont.ttf';

// eslint-disable-next-line import/prefer-default-export
export const Fonts = createGlobalStyle`
  @font-face {
    font-family: Museo;
    src:  url('${Museo500Woff}') format("woff"),
          url('${Museo500Ttf}') format("truetype");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: Museo;
    src:  url('${Museo900Woff}') format("woff"),
          url('${Museo900Ttf}') format("truetype");
    font-weight: 900;
    font-style: normal;
  }
  @font-face {
    font-family: MuseoSans;
    src:  url('${MuseoSans300Woff}') format("woff"),
          url('${MuseoSans300Ttf}') format("truetype");
    font-weight: 100;
    font-style: normal;
  }
  @font-face {
    font-family: MuseoSans;
    src:  url('${MuseoSans500Woff}') format("woff"),
          url('${MuseoSans500Ttf}') format("truetype");
    font-weight: 500;
    font-style: normal;
  }
  @font-face {
    font-family: MuseoSans;
    src:  url('${MuseoSans900Woff}') format("woff"),
          url('${MuseoSans900Ttf}') format("truetype");
    font-weight: 900;
    font-style: normal;
  }
`;
