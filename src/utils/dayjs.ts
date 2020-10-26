import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import customParseFormat from 'dayjs/plugin/customParseFormat';

import 'dayjs/locale/ru';

dayjs.extend(weekday);
dayjs.extend(customParseFormat);
dayjs.locale('ru');

export default dayjs;

export const formatDate = 'D-MM-YYYY';
