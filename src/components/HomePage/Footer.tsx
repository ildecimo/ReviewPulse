import Image from 'next/image';
import Link from 'next/link';

import Logo from '~/components/HomePage/Logo';

export default function Footer() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Top area: Blocks */}
        <div className="grid gap-8 border-t border-gray-200 py-8 sm:grid-cols-12 md:py-12">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2">
              <Logo />
            </div>
            <div className="text-sm text-gray-600">
              <span className="mr-2 font-bold">Review Pulse</span>
              <div className="mb-2">
                <Link
                  href="https://www.ildecimo.com/"
                  className="text-gray-600 transition duration-150 ease-in-out hover:text-gray-900 hover:underline"
                  target="_blank"
                >
                  ildecimo.com
                </Link>
              </div>
              <div>
                <Image
                  src="/images/partner-logo.png"
                  alt="BigCommerce Partner"
                  width={110}
                  height={100}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom area */}
        <div className="border-t border-gray-200 py-4 text-center md:flex md:items-center md:justify-between md:py-8">
          {/* Copyrights note */}
          <div className="mr-4 text-sm text-gray-600">
            &copy; ildecimo.com All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
}
