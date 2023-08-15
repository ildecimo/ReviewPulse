'use client';

import '~/styles/home.css';

import Footer from '~/components/HomePage/Footer';
import Header from '~/components/HomePage/Header';
import Video from '~/components/HomePage/Video';

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
              <div className="pb-12 text-center md:pb-6">
                <h1 className="leading-tighter mb-4 text-5xl font-extrabold tracking-tighter md:text-6xl">
                  Welcome to
                  <br />
                  <span className="bg-gradient-to-r from-blue-500 to-teal-400 bg-clip-text text-transparent">
                    REVIEW PULSE
                  </span>
                </h1>
              </div>
            </div>
            <div className="my-10">
              <h2 className="text-3xl font-semibold text-gray-700">
                How to access Review Pulse App
              </h2>
              <div className="mt-2 text-xl">
                <p className="pb-2 text-gray-600">
                  Navigate to Products/View/Actions/ildecimo Review Pulse
                </p>
                <div className="overflow-hidden rounded-xl shadow-xl">
                  <Video src="/videos/open-app.mp4" />
                </div>
              </div>

              <h2 className="mt-12 text-3xl font-semibold text-gray-700">
                How to view AI suggestions
              </h2>
              <div className="mt-2 text-xl">
                <p className="pb-2 text-gray-600">Navigate to AI Explore</p>
                <div className="overflow-hidden rounded-xl shadow-xl">
                  <Video src="/videos/view-ai-suggestions.mp4" />
                </div>
              </div>

              <h2 className="mt-12 text-3xl font-semibold text-gray-700">
                Change the Review Status
              </h2>
              <div className="mt-2 text-xl">
                <p className="pb-2 text-gray-600">
                  Use the Approve / Disapprove / Set Pending buttons
                </p>
                <div className="overflow-hidden rounded-xl shadow-xl">
                  <Video src="/videos/status-reviews.mp4" />
                </div>
              </div>

              <h2 className="mt-12 text-3xl font-semibold text-gray-700">
                Generate e-mails with AI
              </h2>
              <div className="mt-2 text-xl">
                <p className="pb-2 text-gray-600">
                  Use the Follow Up and Thank You buttons
                </p>
                <div className="overflow-hidden rounded-xl shadow-xl">
                  <Video src="/videos/generate-emails.mp4" />
                </div>
              </div>

              <h2 className="mt-12 text-3xl font-semibold text-gray-700">
                Navigate to all products
              </h2>
              <div className="mt-2 text-xl">
                <p className="pb-2 text-gray-600">
                  Use the top breadcrumb to navigate to all products
                </p>
                <div className="overflow-hidden rounded-xl shadow-xl">
                  <Video src="/videos/navigate-products.mp4" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
