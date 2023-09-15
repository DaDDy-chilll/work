import { colors } from '../assets/theme/theme';

export const changeTextColor = ({ action }) => {
  let textColor;

  if (action === 'SUBMITTED') textColor = colors.darkYellow[800];
  if (action === 'PENDING') textColor = colors.darkYellow[800];

  if (action === 'APPROVED') textColor = colors.paleGreen[800];
  if (action === 'VERIFIED') textColor = colors.darkGreen[800];
  if (action === 'REJECTED') textColor = colors.red[800];

  if (action === 'PREPARED') textColor = colors.orange[800];
  if (action === 'COMMENTED') textColor = colors.paleBlue[800];

  if (action === 'REQUESTED_REVISION') textColor = colors.purple[800];
  if (action === 'REVISED') textColor = colors.darkBlue[800];
  if (action === 'ACKNOWLEDGED') textColor = colors.purple[800];

  return textColor;
};

export const changeBgColor = ({ action }) => {
  let bgColor;

  if (action === 'SUBMITTED') bgColor = colors.darkYellow[200];
  if (action === 'PENDING') bgColor = colors.darkYellow[200];

  if (action === 'APPROVED') bgColor = colors.paleGreen[200];
  if (action === 'VERIFIED') bgColor = colors.darkGreen[200];
  if (action === 'REJECTED') bgColor = colors.red[200];

  if (action === 'PREPARED') bgColor = colors.orange[200];
  if (action === 'COMMENTED') bgColor = colors.paleBlue[200];

  if (action === 'REQUESTED_REVISION') bgColor = colors.purple[200];
  if (action === 'REVISED') bgColor = colors.darkBlue[200];
  if (action === 'ACKNOWLEDGED') bgColor = colors.purple[200];

  return bgColor;
};
