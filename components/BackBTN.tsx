import { color } from '@/theme/theme_other';
import { css } from '@emotion/react';
import React from 'react';
import { BsFillBackspaceFill } from 'react-icons/bs';

const BackBTN = ({ className }: { className?: any }) => {
  return (
    <div
      className={className}
      css={css`
        font-size: 30px;
      `}
    >
      <BsFillBackspaceFill
        css={css`
          color: ${color.third};
          cursor: pointer;
          :active {
            color: #a9a9a9;
          }
        `}
      />
    </div>
  );
};

export default React.memo(BackBTN);
