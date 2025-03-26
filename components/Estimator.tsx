'use client'
import { useState } from 'react'
import Link from 'next/link'

type StoryType = 'one' | 'two'
type CleaningType = 'full' | 'exterior'
type BuildingType = 'residential' | 'commercial' | null

type EstimateType =
  | {
      message: string
      priceRange: string
    }
  | string

export default function Estimator() {
  const [numWindows, setNumWindows] = useState<string>('')
  const maxWindows = 100 // You can adjust this maximum value
  const [storyType, setStoryType] = useState<StoryType>('one')
  const [cleaningType, setCleaningType] = useState<CleaningType>('full')
  const [estimate, setEstimate] = useState<EstimateType>('')
  const [buildingType, setBuildingType] = useState<BuildingType>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const resetTool = () => {
    setNumWindows('')
    setStoryType('one')
    setCleaningType('full')
    setEstimate('')
    if (buildingType !== 'residential') {
      setBuildingType(null)
    }
  }

  const handleWindowsChange = (value: string) => {
    const num = parseInt(value)
    if (num > maxWindows) {
      setNumWindows(maxWindows.toString())
    } else {
      setNumWindows(value)
    }
  }

  const calculateEstimate = async () => {
    if (!numWindows) {
      setEstimate('Please enter a valid number of windows')
      return
    }

    const windowCount = parseInt(numWindows)

    if (isNaN(windowCount) || windowCount <= 0) {
      setEstimate('Please enter a valid number of windows')
      return
    }

    try {
      setIsCalculating(true)
      const response = await fetch('/api/calculate-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          windowCount,
          storyType,
          cleaningType,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to calculate estimate')
      }

      const data = await response.json()
      setEstimate(data)
    } catch {
      setEstimate('Sorry, something went wrong. Please try again.')
    } finally {
      setIsCalculating(false)
    }
  }

  // Add a helper function to check if it's a successful estimate
  const isSuccessfulEstimate = (est: EstimateType): boolean => {
    return typeof est === 'object' && est !== null
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h1 className="text-3xl font-bold text-logoblue-30 text-center mb-8">
        Free Window Cleaning Estimator
      </h1>

      <div className="space-y-6 w-full max-w-md mb-5 pb-5 font-inter">
        <div className="text-center">
          <label className="block text-lg font-semibold mb-2">
            Type of Property:
          </label>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setBuildingType('residential')}
              className={`px-4 py-2 rounded-sm transition-all ${
                buildingType === 'residential'
                  ? 'bg-logoblue-30'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              <span
                className={
                  buildingType === 'residential'
                    ? 'text-white animate-pulse'
                    : ''
                }
              >
                Residential
              </span>
            </button>
            <button
              onClick={() => setBuildingType('commercial')}
              className={`px-4 py-2 rounded-sm transition-all ${
                buildingType === 'commercial'
                  ? 'bg-logoblue-30'
                  : 'bg-gray-200 text-black hover:bg-gray-300'
              }`}
            >
              <span
                className={
                  buildingType === 'commercial'
                    ? 'text-white animate-pulse'
                    : ''
                }
              >
                Commercial/Business
              </span>
            </button>
          </div>
        </div>

        {buildingType === 'commercial' ? (
          <div className="text-center space-y-4 mb-5 pb-5">
            <p className="text-md text-logobrown-10 mb-5 pb-5">
              Sorry! Commercial and Business quotes are not available through
              our estimator at this time.
            </p>
            <p className="text-lg mb-5 pb-5">
              Please get in touch with us for a custom quote tailored to your
              businesses needs.
            </p>
            <Link href="/contact">
              <button className="px-6 py-2 bg-logoblue-30 text-yellow-logo transition-all shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black font-semibold uppercase">
                Contact Us
              </button>
            </Link>
          </div>
        ) : buildingType === 'residential' ? (
          <>
            <div className="text-center">
              <label className="block text-lg font-semibold mb-2">
                Number of Windows:
              </label>
              <div className="flex flex-col items-center gap-2">
                <input
                  type="range"
                  min="1"
                  max={maxWindows}
                  value={numWindows || '0'}
                  onChange={(e) => handleWindowsChange(e.target.value)}
                  className="w-64 h-2 bg-logobrown-10 outline-2 rounded-lg appearance-none cursor-pointer accent-logoblue-10"
                />
                <input
                  type="number"
                  value={numWindows}
                  onChange={(e) => handleWindowsChange(e.target.value)}
                  className="w-32 p-2 border border-logoblue-30 rounded-sm hover:bg-logobrown-20 focus:outline-none text-center mx-auto"
                  placeholder="Windows ?"
                  min="1"
                  max={maxWindows}
                />
              </div>
            </div>

            <div className="text-center">
              <label className="block text-lg font-semibold mb-2">
                House Type:
              </label>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setStoryType('one')}
                  disabled={isSuccessfulEstimate(estimate)}
                  className={`px-4 py-2 rounded-sm transition-all ${
                    storyType === 'one'
                      ? 'bg-logoblue-30'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  } ${
                    isSuccessfulEstimate(estimate)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <span
                    className={
                      storyType === 'one' ? 'text-white animate-pulse' : ''
                    }
                  >
                    One Story
                  </span>
                </button>
                <button
                  onClick={() => setStoryType('two')}
                  disabled={isSuccessfulEstimate(estimate)}
                  className={`px-4 py-2 rounded-sm transition-all ${
                    storyType === 'two'
                      ? 'bg-logoblue-30'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  } ${
                    isSuccessfulEstimate(estimate)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <span
                    className={
                      storyType === 'two' ? 'text-white animate-pulse' : ''
                    }
                  >
                    Two or More Stories
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center">
              <label className="block text-lg font-semibold mb-2">
                Cleaning Type:
              </label>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={() => setCleaningType('full')}
                  disabled={isSuccessfulEstimate(estimate)}
                  className={`px-4 py-2 rounded-sm transition-all ${
                    cleaningType === 'full'
                      ? 'bg-logoblue-30'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  } ${
                    isSuccessfulEstimate(estimate)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <span
                    className={
                      cleaningType === 'full' ? 'text-white animate-pulse' : ''
                    }
                  >
                    Full Clean
                  </span>
                </button>
                <button
                  onClick={() => setCleaningType('exterior')}
                  disabled={isSuccessfulEstimate(estimate)}
                  className={`px-4 py-2 rounded-sm transition-all ${
                    cleaningType === 'exterior'
                      ? 'bg-logoblue-30'
                      : 'bg-gray-200 text-black hover:bg-gray-300'
                  } ${
                    isSuccessfulEstimate(estimate)
                      ? 'opacity-50 cursor-not-allowed'
                      : ''
                  }`}
                >
                  <span
                    className={
                      cleaningType === 'exterior'
                        ? 'text-white animate-pulse'
                        : ''
                    }
                  >
                    Exterior Only
                  </span>
                </button>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={calculateEstimate}
                disabled={isSuccessfulEstimate(estimate) || isCalculating}
                className={`px-6 py-2 transition-all font-semibold uppercase ${
                  isSuccessfulEstimate(estimate) || isCalculating
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-logoblue-30 text-yellow-logo shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black'
                }`}
              >
                {isCalculating ? 'Calculating...' : 'Calculate'}
              </button>
            </div>

            {estimate && (
              <div className="mt-6 p-4 bg-white rounded-sm shadow-md text-center mb-5 pb-5 font-inter">
                <h2 className="text-xl font-semibold text-logoblue-30 mb-2">
                  Your Estimate:
                </h2>
                {typeof estimate === 'string' ? (
                  <p className="text-lg mb-4">{estimate}</p>
                ) : (
                  <>
                    <p className="text-lg mb-2">{estimate.message}</p>
                    <p className="text-lg mb-4 text-logobrown-10 font-bold font-inter">
                      {estimate.priceRange}
                    </p>
                    <button
                      onClick={resetTool}
                      className="px-4 py-2 bg-yellow-logo text-black hover:bg-logobrown-10 hover:text-white rounded-sm transition-all font-inter mb-2"
                    >
                      Try Again
                    </button>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-lg mb-4 font-semibold">
                        Like what you see? Have questions?
                      </p>
                      <Link href="/contact">
                        <button className="px-6 py-2 bg-logoblue-30 text-yellow-logo transition-all shadow-[3px_3px_0px_steelblue] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] hover:bg-logoblue-50 hover:text-black font-semibold uppercase">
                          Contact Us
                        </button>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  )
}
