import { v4 as uuidv4 } from 'uuid';

const KEY = 'guest_uid';

export function getGuestId(): string {
  if (typeof window === 'undefined') return '';

  let id = localStorage.getItem(KEY);
  if (!id) {
    id = uuidv4();
    localStorage.setItem(KEY, id);
  }
  return id;
}
