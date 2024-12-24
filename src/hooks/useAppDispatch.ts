import type { AppDispatch } from '@/store';
import { useDispatch } from 'react-redux';

// Typed versions of the hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
