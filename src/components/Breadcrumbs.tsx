import { ChevronDoubleRightIcon } from '@heroicons/react/20/solid';
import Link, { type LinkProps } from 'next/link';

interface BreadcrumbsProps {
  children: React.ReactNode;
}

export const Breadcrumbs = ({ children }: BreadcrumbsProps) => (
  <div className="space-x-2 text-sm flex items-center">{children}</div>
);

const BreadcrumbLink = (props: LinkProps & { children: React.ReactNode }) => (
  <Link {...props} className="text-blue-800 hover:underline" />
);

const BreadcrumbDivider = () => (
  <span>
    <ChevronDoubleRightIcon className="w-4 h-4 text-gray-500" />
  </span>
);

const BreadcrumbText = ({ children }: { children: React.ReactNode }) => (
  <span className="font-semibold text-gray-600">{children}</span>
);

Breadcrumbs.Divider = BreadcrumbDivider;
Breadcrumbs.Link = BreadcrumbLink;
Breadcrumbs.Text = BreadcrumbText;
