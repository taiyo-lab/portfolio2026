import React from 'react';
import { cn } from './utils';

interface SectionHeadingProps {
  title: string;
  description?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export function SectionHeading({
  title,
  description,
  className,
  titleClassName,
  descriptionClassName,
}: SectionHeadingProps) {
  return (
    <div className={cn('text-center mb-12', className)}>
      <h2 className={cn('text-3xl md:text-4xl', description && 'mb-4', titleClassName)}>{title}</h2>
      {description && (
        <p className={cn('text-muted-foreground max-w-2xl mx-auto', descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}
