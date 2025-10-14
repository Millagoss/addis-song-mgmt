/** @jsxImportSource @emotion/react */
import { keyframes, css } from "@emotion/react";
import { theme } from "../theme/theme";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export function CircularLoading({ visible }: { visible?: boolean }) {
  if (!visible) return null;
  return (
    <span
      css={css`
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid #334155;
        border-top-color: ${theme.colors.primary};
        display: inline-block;
        animation: ${spin} 0.9s linear infinite;
        margin-left: 12px;
      `}
    />
  );
}

