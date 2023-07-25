import { css } from '@emotion/react';
import { NextPage } from 'next';
import { ReactNode } from 'react';
import { color } from '../theme/theme_other';

interface BtnProps {
  children: ReactNode | string;
  className?: string;
  onClick?: any;
}

const ButtonCustom: NextPage<BtnProps> = ({ children, onClick, className }) => {
  console.log('버튼');

  return (
    <button
      css={css`
        background-color: ${color.font};
        border-radius: 50px;
        padding: 5px 15px;
        color: ${color.third};
        font-size: 15px;
        transition: 0.2s ease;
        box-shadow: 0px 1px 2px 1px rgba(102, 102, 102, 0.3);

        :active {
          background-color: #ffffff;
        }
      `}
      onClick={onClick}
      className={className}
    >
      {children}
    </button>
  );
};

export default ButtonCustom;
