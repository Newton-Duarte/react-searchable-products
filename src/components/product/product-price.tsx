import { PropsWithChildren } from 'react';

export function ProductPrice({
  className,
  children,
}: PropsWithChildren<{ className?: ClassName }>) {
  return (
    <h2 className={`font-bold text-lg self-center ${className}`}>{children}</h2>
  );
}
