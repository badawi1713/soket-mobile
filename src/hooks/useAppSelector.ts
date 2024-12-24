import type { RootState } from '@//store';
import { type TypedUseSelectorHook, useSelector } from 'react-redux';

// Typed versions of the hooks
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
