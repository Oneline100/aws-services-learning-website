import type { SyntheticEvent } from 'react';

export const PLACEHOLDER_ICON = './icons/placeholder.svg';

export function handleIconError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  img.onerror = null;
  img.src = PLACEHOLDER_ICON;
}
