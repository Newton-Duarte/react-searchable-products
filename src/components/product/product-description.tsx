import { PropsWithChildren } from 'react';

export function ProductDescription({
  className,
  children,
}: PropsWithChildren<{ className?: ClassName }>) {
  return (
    <p className={`text-sm text-gray-600 line-clamp-4 ${className}`}>
      {children}
    </p>
  );
}
