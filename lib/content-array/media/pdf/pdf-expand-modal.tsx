'use client';

import MaximizeIcon from '@/assets/svg/icons/pdf/maximize.svg';
import MinimizeIcon from '@/assets/svg/icons/pdf/minimize.svg';

type PDFExpandModalProps = (
  { setIsOpen: (open: boolean) => void; variant: 'maximize' }
  | { setIsOpen: (open: boolean) => void; variant: 'minimize' }
);

export default function PDFExpandModal({ setIsOpen, variant }: PDFExpandModalProps) {
  return (
    <button
      type="button"
      className="btn-template w-16 justify-center"
      onClick={() => setIsOpen(variant === 'maximize')}
      aria-label={variant === 'maximize' ? 'Expand PDF viewer' : 'Minimize PDF viewer'}
    >
      {variant === 'maximize' ? <MaximizeIcon className="h-8"/> : <MinimizeIcon className="h-8"/>}
    </button>
  )
}