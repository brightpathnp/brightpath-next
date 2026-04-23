import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, GraduationCap, MapPin, Users } from 'lucide-react'

export default function Hero(): JSX.Element {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 min-h-[90vh] flex items-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/placeholder.jpg"
          alt=""
          fill
          className="object-cover opacity-20"
          priority
        />
        {/* TODO: Replace with actual hero background image */}
      </div>

      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-900/60 via-transparent to-slate-900/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-400/20 rounded-full px-4 py-2">
              <GraduationCap className="w-4 h-4 text-blue-400" aria-hidden="true" />
              <span className="text-blue-300 text-sm font-medium">
                Nepal&apos;s Trusted Education Consultancy
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Your Path to a{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Brighter Future
                </span>{' '}
                Starts Here
              </h1>
              <p className="text-lg text-slate-300 leading-relaxed max-w-xl">
                BrightPath guides Nepali students through every step of studying abroad — from
                university selection and visa applications to scholarships and language preparation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                Book Free Consultation
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 active:bg-white/5 text-white font-semibold px-6 py-3 rounded-lg border border-white/20 transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Services
              </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-6 pt-2">
              <div className="flex items-center gap-2 text-slate-300">
                <Users className="w-5 h-5 text-blue-400 shrink-0" aria-hidden="true" />
                <span className="text-sm">
                  <strong className="text-white font-semibold">500+</strong> Students Placed
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0" aria-hidden="true" />
                <span className="text-sm">
                  <strong className="text-white font-semibold">20+</strong> Destinations Worldwide
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <GraduationCap className="w-5 h-5 text-blue-400 shrink-0" aria-hidden="true" />
                <span className="text-sm">
                  <strong className="text-white font-semibold">95%</strong> Visa Success Rate
                </span>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] max-w-md mx-auto">
              <Image
                src="/hero.jpg"
                alt="Students celebrating their study abroad success with BrightPath"
                fill
                className="object-cover"
                priority
              />
              {/* TODO: Replace with actual hero image of students */}
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-green-600" aria-hidden="true" />
              </div>
              <div>
                <p className="text-xs text-slate-500 font-medium">Latest Success</p>
                <p className="text-sm text-slate-800 font-semibold">Visa Approved — Australia 🇦🇺</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-blue-600 text-white rounded-xl shadow-xl p-4">
              <p className="text-2xl font-bold">7+</p>
              <p className="text-xs text-blue-200">Years of Experience</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}