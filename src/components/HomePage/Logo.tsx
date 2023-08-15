import Image from 'next/image';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="block" aria-label="Review Pulse">
      <Image
        src="/images/logo.webp"
        alt="Review Pulse"
        width={40}
        height={40}
        priority
      />
    </Link>
  );
}
