import Link from 'next/link';

interface NextLinkProps {
  href: string;
  children: React.ReactNode | string;
}

export const NextLink = ({ href, children, ...props }: NextLinkProps) => (
  <Link
    className="inline-flex items-center whitespace-nowrap text-blue-700 hover:text-blue-900"
    href={href}
    {...props}
  >
    {children}
  </Link>
);
