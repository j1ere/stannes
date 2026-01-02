import { Cross } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 p-3 shadow-2xl">
            <img
              src="/images/chaplaincylogo-removebg-preview.png"
              alt="St. Anne's Catholic Chaplaincy Logo"
              className="w-full h-full object-contain animate-pulse"
            />
          </div>
          <div className="absolute inset-0 w-24 h-24 mx-auto border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

          <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full flex items-center justify-center animate-bounce">
            <Cross className="w-3 h-3 text-white" />
          </div>
          <div
            className="absolute -bottom-2 -left-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center animate-bounce"
            style={{ animationDelay: "0.5s" }}
          >
            <Cross className="w-3 h-3 text-white" />
          </div>
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-green-200 via-emerald-100 to-orange-200 bg-clip-text text-transparent">
          St. Anne&apos;s Chaplaincy
        </h1>
        <p className="text-white/80 text-lg mb-2">Maseno University</p>
        <p className="text-green-200/70 text-sm mb-6">Catholic Community</p>

        <div className="flex justify-center space-x-2">
          <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>

        <div className="mt-4">
          <p className="text-white/60 text-sm animate-pulse">Loading your spiritual home...</p>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`,
            }}
          >
            <Cross className="w-6 h-6 text-white/30" />
          </div>
        ))}

        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full blur-2xl animate-pulse"></div>
        <div
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-r from-orange-500/20 to-amber-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 bg-gradient-to-r from-emerald-500/15 to-green-500/15 rounded-full blur-xl animate-pulse transform -translate-x-1/2 -translate-y-1/2"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>
    </div>
  )
}
