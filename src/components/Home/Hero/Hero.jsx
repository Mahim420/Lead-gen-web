import Image from "next/image";
import Link from "next/link";
import heroImg from "../../../../public/assets/leadgen.jpeg"; // তোমার image

export default function Hero() {
  return (
    <section className="min-h-screen bg-base-100">
      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid lg:grid-cols-2 items-center gap-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="badge badge-primary badge-outline badge-lg">
              AI Powered Lead Generation
            </div>

            <h1 className="text-5xl lg:text-7xl font-black leading-tight">
              Find Quality <span className="text-primary">Leads.</span>
              <br />
              Grow Your <span className="text-primary">Business.</span>
            </h1>

            <p className="text-lg text-base-content/70 max-w-xl leading-8">
              Generate verified business leads with AI. Search businesses by
              niche and location, discover contact information, and export
              high-quality prospects in seconds.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/leads" className="btn btn-primary btn-lg px-8">
                Generate Leads
              </Link>

              <Link href="/about" className="btn btn-outline btn-lg px-8">
                Learn More
              </Link>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-5 pt-6">
              <div className="card bg-base-200">
                <div className="card-body items-center text-center p-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    🔍
                  </div>

                  <h3 className="font-bold mt-3">Smart Search</h3>

                  <p className="text-sm text-base-content/60">
                    Find targeted leads instantly.
                  </p>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body items-center text-center p-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    📊
                  </div>

                  <h3 className="font-bold mt-3">Verified Data</h3>

                  <p className="text-sm text-base-content/60">
                    High quality business information.
                  </p>
                </div>
              </div>

              <div className="card bg-base-200">
                <div className="card-body items-center text-center p-5">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    ⚡
                  </div>

                  <h3 className="font-bold mt-3">Fast Results</h3>

                  <p className="text-sm text-base-content/60">
                    AI-powered lead generation.
                  </p>
                </div>
              </div>
            </div>

            {/* Trusted */}
            <div className="flex flex-wrap gap-6 pt-4 text-sm text-base-content/60">
              <span>✓ AI Powered</span>
              <span>✓ Global Coverage</span>
              <span>✓ Verified Leads</span>
              <span>✓ Export CSV</span>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -inset-6 bg-primary/20 blur-3xl rounded-full"></div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-base-300">
              <Image
                src={heroImg}
                alt="Lead Generation"
                priority
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
