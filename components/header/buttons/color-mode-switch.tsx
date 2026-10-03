import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import ColorModeSwitchIcon from '@/assets/svg/icons/header/color-mode-switch-icon.svg';

export default function ColorModeSwitch(){
  const { setTheme, resolvedTheme } = useTheme();
  const [ mounted, setMounted ] = useState(false);

  useEffect(() => {
    const mount = async () => {
      setMounted(true);
    };
    mount();
  }, []);

  function onToggle(){
    if(!mounted || resolvedTheme === null) return;
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  const label = 
    mounted && resolvedTheme === 'dark'
      ? 'Switch to light mode' 
      : 'Switch to dark mode';

  return (
    <button 
      className="btn-template w-32 p-2 justify-start cursor-pointer"
      type="button"
      aria-label={mounted ? label : 'Toggle color mode'}
      onClick={onToggle}
    >
      <div
        className={`w-12 h-12 bg-lmSurface dark:bg-dmSurface rounded-[0.5rem] flex justify-center items-center translate-x-0 dark:translate-x-16 color-theme-indicator-transition`}
      >
        <ColorModeSwitchIcon 
          className="h-7 w-auto text-lmSecondary dark:text-dmSecondary color-transition" 
        />
      </div>
    </button>
  )
}