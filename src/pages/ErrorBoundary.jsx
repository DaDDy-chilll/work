/* eslint-disable react/prop-types */
import { ErrorBoundary as EB } from 'react-error-boundary';
import GlobalFallbackRender from '../components/GlobalFallbackRender';

export default function ErrorBoundary({ children }) {
  return <EB fallbackRender={GlobalFallbackRender}>{children}</EB>;
}
