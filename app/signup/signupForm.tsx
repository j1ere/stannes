"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Users,
  GraduationCap,
  ChevronDown,
  ArrowLeft,
} from "lucide-react"

import { useFormState, useFormStatus } from "react-dom"

type State = {
    error?: string;
} | null;

type Props = {
    action: (prevState: State, formData: FormData) => Promise<State>
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-gradient-to-r from-green-600 to-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
    >
      {pending ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
          Creating Account...
        </div>
      ) : (
        "Create Account"
      )}
    </button>
  )
}

export default function SignupForm({ action }: Props) {

    const [state, formAction] = useFormState(action, null)

    const [userType, setUserType] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [passwordMatch, setPasswordMatch] = useState(true)

    const prayerHouses = [
        "St. Rose of Lima",
        "St. Augustine",
        "St. Peter",
        "St. Faustina",
        "St. Agnes",
        "St. Thomas",
    ]

    const yearGroups = [
        "First Year",
        "Second Year",
        "Third Year",
        "Fourth Year",
        "Fifth Year",
        "Postgraduate",
    ]

    const smallChristianCommunities = [
        "St. Teresa of the Child Jesus",
        "St. Francis",
        "St. Teresa of Calcuta",
    ]

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const form = e.currentTarget.form
        if (form) {
            const pw = form.password.value
            const confirmpw = form.confirmPassword.value
            setPasswordMatch(!confirmpw || pw === confirmpw)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-orange-700 flex items-center justify-center p-4">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-amber-300/20 rounded-full blur-xl animate-bounce"></div>
                <div className="absolute top-12 left-16 w-32 h-32 bg-white/10 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-24 right-20 w-24 h-24 bg-white/5 rotate-45 blur-sm"></div>
                <div className="absolute bottom-16 left-1/4 w-28 h-28 bg-amber-300/20 rounded-full blur-lg"></div>
            </div>

            {/* Back to Home */}
            <Link
                href="/"
                className="absolute top-6 left-6 flex items-center space-x-2 text-white/80 hover:text-white transition-colors duration-300 group"
            >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                <span className="text-sm font-medium">Back to Home</span>
            </Link>

            <div className="relative z-10 w-full max-w-lg">
                <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-green-500 to-orange-500 rounded-full flex items-center justify-center">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Join Our Community</h2>
                        <p className="text-gray-600 mt-2">Create your CSA account to get started</p>
                    </div>

                    {/* Error Message */}
                    {state?.error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-center">
                            <p className="text-red-600 text-sm">{state.error}</p>
                        </div>
                    )}

                    <form action={formAction} className="space-y-6">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    id="fullName"
                                    name="fullName"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="Enter your full name"
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="Enter your email"
                                />
                            </div>
                        </div>

                        {/* User Type */}
                        <div>
                            <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                                Are you a student?
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <GraduationCap className="h-5 w-5 text-gray-400" />
                                </div>
                                <select
                                    id="userType"
                                    name="userType"
                                    value={userType}
                                    onChange={(e) => setUserType(e.target.value)}
                                    required
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white transition-all"
                                >
                                    <option value="">Select an option</option>
                                    <option value="student">Yes, I am a student</option>
                                    <option value="non-student">No, I am not a student</option>
                                </select>
                                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                        </div>

                        {/* Student fields */}
                        {userType === "student" && (
                            <>
                                <div>
                                    <label htmlFor="prayerHouse" className="block text-sm font-medium text-gray-700 mb-2">
                                        Prayer House
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Users className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            id="prayerHouse"
                                            name="prayerHouse"
                                            required
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white transition-all"
                                        >
                                            <option value="">Select your prayer house</option>
                                            {prayerHouses.map((house) => (
                                                <option key={house} value={house}>
                                                    {house}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="yearGroup" className="block text-sm font-medium text-gray-700 mb-2">
                                        Year Group
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <GraduationCap className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <select
                                            id="yearGroup"
                                            name="yearGroup"
                                            required
                                            className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white transition-all"
                                        >
                                            <option value="">Select your year group</option>
                                            {yearGroups.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                            <ChevronDown className="h-5 w-5 text-gray-400" />
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {/* Non-student field */}
                        {userType === "non-student" && (
                            <div>
                                <label
                                    htmlFor="smallChristianCommunity"
                                    className="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Small Christian Community
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Users className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <select
                                        id="smallChristianCommunity"
                                        name="smallChristianCommunity"
                                        required
                                        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white transition-all"
                                    >
                                        <option value="">Select your Small Christian Community</option>
                                        {smallChristianCommunities.map((community) => (
                                            <option key={community} value={community}>
                                                {community}
                                            </option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                                        <ChevronDown className="h-5 w-5 text-gray-400" />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Password */}
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    onChange={handlePasswordChange}
                                    minLength={6}
                                    required
                                    className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                    placeholder="Create a password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-gray-400" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    onChange={handlePasswordChange}
                                    required
                                    className={`block w-full pl-10 pr-10 py-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                                        !passwordMatch ? "border-red-300 focus:ring-red-400" : "border-gray-300"
                                    }`}
                                    placeholder="Confirm your password"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
                                </button>
                            </div>
                            {!passwordMatch && (
                                <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                            )}
                        </div>

                        {/* Terms */}
                        <div className="flex items-center">
                            <input
                                id="terms"
                                name="terms"
                                type="checkbox"
                                required
                                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                                I agree to the{" "}
                                <a href="#" className="text-green-600 hover:text-green-500 underline">
                                    Terms and Conditions
                                </a>
                            </label>
                        </div>

                        <SubmitButton />
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        Already have an account?{" "}
                        <Link
                            href="/login"
                            className="font-medium text-green-600 hover:text-green-500 transition-colors"
                        >
                            Sign in here
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}