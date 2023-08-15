'use client';

import '~/styles/home.css';

import Footer from '~/components/HomePage/Footer';
import Header from '~/components/HomePage/Header';

export const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="grow">
        <section className="relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            {/* Hero content */}
            <div className="pb-12 pt-32 md:pb-20 md:pt-40">
              {/* Section header */}
              <div className="pb-12 text-center md:pb-16">
                <h1 className="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl">
                  Welcome to
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                    REVIEW PULSE
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
