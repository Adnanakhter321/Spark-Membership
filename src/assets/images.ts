import { type ImageRequireSource } from 'react-native';

export const images = {
  search: require('./images/search.png'),
  dropdown: require('./images/dropdown.png'),
  setting: require('./images/setting.png'),
  bgImage: require('./images/bg_Image.png'),
  dummyImage: require('./images/dummy_Image.png'),
  tick: require('./images/tick.png'),
  cross: require('./images/cross.png'),
  defaultUser: require('./images/default_user.png'),
} satisfies Record<string, ImageRequireSource>;
