import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-base-100">
      <article className="mx-auto max-w-4xl px-6 py-16 lg:px-8">
        {/* ================= HEADER ================= */}
        <header className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-primary">
            About Our Project
          </p>

          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Lead Generation Platform
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-base-content/60">
            An automated web application designed to make business lead
            generation faster, easier, and more organized.
          </p>
        </header>

        {/* ================= INTRODUCTION ================= */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Introduction</h2>

          <p className="mb-4 leading-8 text-base-content/70">
            Lead generation is the process of identifying and collecting
            potential customers or businesses that may be interested in a
            product or service. In traditional methods, collecting this
            information manually can take a significant amount of time and
            effort.
          </p>

          <p className="leading-8 text-base-content/70">
            Our Lead Generation Platform was developed to simplify this process.
            The system allows users to provide a search query and location, and
            then automatically collects relevant business information. This
            makes the lead discovery process faster and more efficient.
          </p>
        </section>

        {/* ================= PROJECT OVERVIEW ================= */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">About The Project</h2>

          <p className="mb-4 leading-8 text-base-content/70">
            The main purpose of this project is to create a web-based lead
            generation system where users can search for businesses based on
            specific keywords and locations.
          </p>

          <p className="mb-4 leading-8 text-base-content/70">
            For example, a user can search for <strong>"Restaurants"</strong> in{" "}
            <strong>"New York"</strong>. The system then collects available
            business information such as business name, phone number, website,
            email, and address.
          </p>

          <p className="leading-8 text-base-content/70">
            The generated leads are stored in a database and associated with the
            respective user. This allows users to access their previous lead
            generation history from the dashboard.
          </p>
        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">How The System Works</h2>

          <p className="mb-4 leading-8 text-base-content/70">
            The system follows a simple workflow. First, the user provides the
            required search information. The application then sends the request
            to the backend, where the lead generation process is started.
          </p>

          <div className="my-6 rounded-xl bg-base-200 p-6">
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="font-bold text-primary">01.</span>
                <span>User enters a business query and location.</span>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-primary">02.</span>
                <span>The backend receives and validates the request.</span>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-primary">03.</span>
                <span>Apify collects relevant business information.</span>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-primary">04.</span>
                <span>
                  The collected lead data is processed by the application.
                </span>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-primary">05.</span>
                <span>The lead information is stored in MongoDB.</span>
              </li>

              <li className="flex gap-3">
                <span className="font-bold text-primary">06.</span>
                <span>
                  Users can view their generated leads from the dashboard.
                </span>
              </li>
            </ol>
          </div>
        </section>

        {/* ================= TECHNOLOGIES ================= */}
        <section className="mb-12">
          <h2 className="mb-6 text-2xl font-bold">Technologies Used</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-primary">Next.js</h3>
              <p className="mt-2 leading-7 text-base-content/70">
                Next.js is a React framework used to build the main web
                application. It is used for page routing, server-side
                functionality, API routes, and overall application structure.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">Tailwind CSS</h3>
              <p className="mt-2 leading-7 text-base-content/70">
                Tailwind CSS is used to design and style the user interface
                using utility classes.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">DaisyUI</h3>
              <p className="mt-2 leading-7 text-base-content/70">
                DaisyUI is used together with Tailwind CSS to create reusable
                and clean UI components such as buttons, cards, tables, and
                other interface elements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">Apify</h3>
              <p className="mt-2 leading-7 text-base-content/70">
                Apify is used for automated web data extraction. It helps the
                application collect business and lead information based on the
                user's search query and location.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">MongoDB</h3>
              <p className="mt-2 leading-7 text-base-content/70">
                MongoDB is used as the database of the application. User
                information, generated lead data, search history, and related
                information are stored in MongoDB.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">Authentication</h3>
              <p className="mt-2 leading-7 text-base-content/70">
                Authentication is used to provide secure user access. Each
                user's generated leads are associated with their account so that
                users can access their own lead history.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-primary">React Icons</h3>
              <p className="mt-2 leading-7 text-base-content/70">
                React Icons is used to add different icons throughout the
                application's user interface.
              </p>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Main Features</h2>

          <ul className="list-disc space-y-3 pl-6 leading-7 text-base-content/70">
            <li>User registration and authentication</li>
            <li>Business-based lead search</li>
            <li>Location-based lead generation</li>
            <li>Automated lead collection using Apify</li>
            <li>Lead information storage using MongoDB</li>
            <li>User-specific lead history</li>
            <li>Lead details viewing</li>
            <li>Organized lead management through dashboard</li>
          </ul>
        </section>

        {/* ================= PROJECT GOAL ================= */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Project Goal</h2>

          <p className="leading-8 text-base-content/70">
            The main goal of this project is to reduce the time and effort
            required for manual lead collection. By combining modern web
            technologies with automated data extraction, the platform provides a
            simple and efficient way to discover potential business leads.
          </p>
        </section>

        {/* ================= FUTURE DEVELOPMENT ================= */}
        <section className="mb-12">
          <h2 className="mb-4 text-2xl font-bold">Future Improvements</h2>

          <p className="mb-4 leading-8 text-base-content/70">
            Although the current system provides the core lead generation
            functionality, several improvements can be added in the future.
          </p>

          <ul className="list-disc space-y-3 pl-6 leading-7 text-base-content/70">
            <li>Advanced lead filtering</li>
            <li>Lead export in CSV or Excel format</li>
            <li>Email verification</li>
            <li>Lead quality scoring</li>
            <li>Advanced analytics and statistics</li>
            <li>Automated email outreach</li>
            <li>More data sources and scraping options</li>
          </ul>
        </section>

        {/* ================= TEAM ================= */}
        <section className="border-t border-base-300 pt-12">
          <h2 className="mb-3 text-2xl font-bold">Project Team</h2>

          <p className="mb-8 leading-7 text-base-content/60">
            This project was developed as a team project by the following
            members:
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-base-300 bg-base-200 p-5">
              <p className="text-sm text-base-content/50">Team Member</p>
              <h3 className="mt-1 text-xl font-bold">Mahim</h3>
            </div>

            <div className="rounded-xl border border-base-300 bg-base-200 p-5">
              <p className="text-sm text-base-content/50">Team Member</p>
              <h3 className="mt-1 text-xl font-bold">Solaiman</h3>
            </div>

            <div className="rounded-xl border border-base-300 bg-base-200 p-5">
              <p className="text-sm text-base-content/50">Team Member</p>
              <h3 className="mt-1 text-xl font-bold">Nafiza</h3>
            </div>

            <div className="rounded-xl border border-base-300 bg-base-200 p-5">
              <p className="text-sm text-base-content/50">Team Member</p>
              <h3 className="mt-1 text-xl font-bold">Toshiba</h3>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}
