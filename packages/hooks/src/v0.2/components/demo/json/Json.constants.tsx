import { CSSProperties } from 'react';

export const ROOT_STYLE: CSSProperties = {
  position: 'relative',
};

export const HEADER_STYLE: CSSProperties = {
  position: 'relative',
  borderBottom: '1px solid #ebedf1',
  margin: '-24px -24px 0',
  padding: '24px 48px 24px 24px',
  overflow: 'hidden',
};

export const PROGRESS_BAR_STYLE: any = {
  '--progressBarAccent': '#4569D4',
  position: 'absolute',
  top: 0,
  left: 0,
  height: 2,
  background: 'var(--progressBarAccent, #4569D4)',
  boxShadow: '0 0 24px 0 var(--progressBarAccent, #4569D4)',
};

export const BUTTON_STYLE: CSSProperties = {
  position: 'absolute',
  top: '50%',
  right: '8px',
  transform: 'translate(0, -50%)',
  width: '32px',
  height: '32px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '128px',
  background: '#F0F0F0',
  marginTop: '16px',
  fontFamily: 'monospace',
  margin: '0',
  border: '0',
  color: 'inherit',
  textDecoration: 'none',
};

export const ACTIONS_STYLE: CSSProperties = {
  position: 'relative',
  margin: '16px -24px 0 0',
  paddingRight: '48px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export const LABEL_STYLE: CSSProperties = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 0 8px 8px',
};

export const CHECKBOX_STYLE: CSSProperties = {
  margin: '0 8px 0 0',
};
