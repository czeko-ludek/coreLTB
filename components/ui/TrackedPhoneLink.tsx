'use client';

import { trackPhoneClick } from '@/lib/analytics';

interface TrackedPhoneLinkProps {
  href: string;
  location: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * Client wrapper for phone links in server components.
 * Fires trackPhoneClick on click while keeping the parent as RSC.
 */
export function TrackedPhoneLink({ href, location, className, children }: TrackedPhoneLinkProps) {
  return (
    <a
      href={href}
      onClick={() => trackPhoneClick(location)}
      className={className}
    >
      {children}
    </a>
  );
}
