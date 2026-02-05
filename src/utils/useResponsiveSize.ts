import { Dimensions } from 'react-native';

function getResponsiveSize(size: number, otherParams?: string): number {
  const { height, width } = Dimensions.get('window');
  const [shortDimension, longDimension] =
    width < height ? [width, height] : [height, width];

  // const guidelineBaseWidth = 428;
  // const guidelineBaseHeight = 1800;

  const guidelineBaseWidth = 428;
  const guidelineBaseHeight = 926;

  // const guidelineBaseWidth = 500;
  // const guidelineBaseHeight = 1000;

  const averageDimension = (longDimension + shortDimension) / 2;
  const averageGuidelineDimension =
    (guidelineBaseHeight + guidelineBaseWidth) / 2;

  if (otherParams === 'getHeight') {
    return height;
  }
  if (otherParams === 'getWidth') {
    return width;
  }

  if (otherParams === 'useHeight') {
    return (longDimension / guidelineBaseHeight) * size;
  }

  if (otherParams === 'useWidth') {
    return (shortDimension / guidelineBaseWidth) * size;
  }

  // return averageDimension / (averageDimension / size);
  return (averageDimension / averageGuidelineDimension) * size;
}

const Size = {
  calcHeight(size: number) {
    return getResponsiveSize(size, 'useHeight');
    // return scale(size);
  },

  calcWidth(size: number) {
    return getResponsiveSize(size, 'useWidth');
    // return scale(size);
  },

  calcAverage(size: number) {
    return getResponsiveSize(size);
    // return scale(size);
  },

  getHeight() {
    return getResponsiveSize(1, 'getHeight');
  },

  getWidth() {
    return getResponsiveSize(1, 'getWidth');
  },
};

export default Size;
