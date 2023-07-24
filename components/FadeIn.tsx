import { Fade } from '@mui/material';
import React, { ReactElement, ReactNode } from 'react';

const FadeIn = ({
  children,
  index,
}: {
  children: ReactElement;
  index: number;
}) => {
  return (
    <Fade
      in
      timeout={500}
      style={{
        transitionDelay: `${500 * index}ms`,
      }}
    >
      {children}
    </Fade>
  );
};

export default React.memo(
  FadeIn,
  (pre, next) => pre.index === next.index && pre.children === next.children,
);
