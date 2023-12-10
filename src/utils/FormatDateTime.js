import { format } from 'date-fns';

export function formatDateTime(dateTimeString) {
  const date = new Date(dateTimeString);
  return format(date, 'MM-dd-yyyy hh:mm:ss a');
}
