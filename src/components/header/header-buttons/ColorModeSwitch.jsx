import './ColorModeSwitch.css';
import ColorModeSwitchIcon from '../../../assets/icons/header/color-mode-switch-icon.svg?react';

export function ColorModeSwitch({colorMode, setColorMode}){
  const switchColorMode = async () => {
    setColorMode(colorMode === 'darkMode' ? 'lightMode' : 'darkMode');
    
  }

  return(
    <div className={`color-mode-switch ${colorMode==='darkMode' ? 'isDarkMode' : 'isLightMode'}`} onClick={switchColorMode}>
      <div className="mode-indicator">
        <ColorModeSwitchIcon aria-label="Switch Color Modes" />
      </div>
    </div>
  )
}