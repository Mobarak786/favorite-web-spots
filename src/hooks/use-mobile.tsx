
import * as React from "react"

// Updated mobile breakpoint
const MOBILE_BREAKPOINT = 768

/**
 * Hook to detect if the current device is a mobile device
 * Uses both media queries and screen width to ensure cross-browser compatibility
 * @returns boolean indicating if current device is mobile (true) or desktop (false)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    // Function to check if device is mobile based on screen width
    const checkIsMobile = () => {
      const width = window.innerWidth
      return width < MOBILE_BREAKPOINT
    }

    // Set initial state
    setIsMobile(checkIsMobile())

    // Use both matchMedia for modern browsers and resize event for broader support
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    const handleChange = () => {
      setIsMobile(checkIsMobile())
    }
    
    // Add event listeners
    mql.addEventListener("change", handleChange)
    window.addEventListener("resize", handleChange)
    
    // Cleanup function
    return () => {
      mql.removeEventListener("change", handleChange)
      window.addEventListener("resize", handleChange)
    }
  }, [])

  return !!isMobile
}
