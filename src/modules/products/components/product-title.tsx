import { PropsWithChildren } from 'react';

export function ProductTitle({
  className,
  children,
}: PropsWithChildren<{ className?: ClassName }>) {
  return <h2 className={`text-lg font-medium ${className}`}>{children}</h2>;
}
