import React from 'react'

function OurMagicalProcess() {
  return (
    <div className=' '>{/* Process Section */}
      <section className=" px-6 py-10  backdrop-blur-xl">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl text-gray-900 font-black ">
              Our Magical
              <span className="ml-2 bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                Process
              </span>
            </h2>
            <p className="text-base text-gray-800 max-w-3xl mx-auto">
              From spark of an idea to market domination—we've perfected the art of app development.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Discovery", desc: "Deep dive into your vision and market opportunities", icon: "🔍", color: "from-orange-400 to-red-500" },
              { number: "02", title: "Strategy", desc: "Craft the perfect roadmap for digital success", icon: "🎯", color: "from-red-500 to-pink-500" },
              { number: "03", title: "Creation", desc: "Build with cutting-edge tech and flawless design", icon: "⚡", color: "from-pink-500 to-purple-500" },
              { number: "04", title: "Launch", desc: "Deploy, monitor, and scale to global success", icon: "🚀", color: "from-purple-500 to-orange-400" }
            ].map((step, index) => (
              <div
                key={index}
                className="group relative hover:bg-orange-600/70 hover:text-white backdrop-blur-xl rounded-lg p-5 border border-slate-700/50 hover:border-orange-400/50 transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
              >
                <div className="text-md font-bold text-gray-700 mb-2 group-hover:text-white transition-colors">
                  {step.icon}  {step.title}
                </div>
               
                
                <p className="text-gray-700 hover:text-white leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section></div>
  )
}

export default OurMagicalProcess