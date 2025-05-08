import I18n from 'react-native-i18n';
import tr from './tr';
import en from './en';
import zn from './zn-CN';
import de from './de';
import es from './es';
import fr from './fr';
import hi from './hi';
import it from './it';
import ja from './ja';
import ko from './ko';
import ms from './ms';
import pt from './pt';
import ru from './ru';
import vi from './vi';
import {observer} from "mobx-react";


I18n.fallbacks = true;

I18n.translations = observer({
  tr,
  zn,
  de,
  es,
  fr,
  hi,
  it,
  ja,
  ko,
  ms,
  pt,
  ru,
  vi,
  en
});
// console.log(JSON.stringify(en))
// I18n.defaultLocale = 'tr-TR'
I18n.defaultLocale = 'en-GB'

export default I18n;
