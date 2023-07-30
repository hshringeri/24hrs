import React from 'react';


const AnchorLink = ({ children, href, className, icon, tabIndex, testId }) => {
  return (
    <a href={href}>
      <a href={href} className={className} icon={icon} tabIndex={tabIndex} testId={testId}>
        {children}
      </a>
    </a>
  );
};

export default AnchorLink;