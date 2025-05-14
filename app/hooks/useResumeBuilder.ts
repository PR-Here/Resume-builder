import { useResumeBuilder as useResumeContext } from '../context/ResumeContext';

export function useResumeBuilder() {
  const context = useResumeContext();
  return context;
} 