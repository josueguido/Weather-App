import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const Tooltip = ({ text, children }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div className="relative inline-block" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {visible && (
        <div className="absolute bg-gray-700 text-white text-xs rounded py-1 px-2 bottom-full left-1/2 transform -translate-x-1/2 mb-1 z-10">
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
