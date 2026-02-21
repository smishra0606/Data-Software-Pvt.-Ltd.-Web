
import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

interface InteractiveSliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  showTooltip?: boolean;
  formatTooltip?: (value: number) => string;
  variant?: "default" | "gradient" | "neon"; 
}

const InteractiveSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  InteractiveSliderProps
>(({ 
  className, 
  showTooltip = true, 
  formatTooltip = (value) => `${value}`, 
  variant = "default",
  ...props 
}, ref) => {
  const [hovering, setHovering] = React.useState(false)
  const [values, setValues] = React.useState(props.defaultValue || [0])
  const { theme } = useTheme()
  
  const isDark = theme === "dark"

  React.useEffect(() => {
    if (props.value) {
      setValues(props.value)
    }
  }, [props.value])

  const handleValueChange = (newValues: number[]) => {
    setValues(newValues)
    if (props.onValueChange) {
      props.onValueChange(newValues)
    }
  }

  const getTrackBackground = () => {
    switch (variant) {
      case "gradient":
        return isDark 
          ? "bg-gradient-to-r from-indigo-900/50 via-brand-800/50 to-purple-900/50" 
          : "bg-gradient-to-r from-indigo-100 via-brand-100 to-purple-100"
      case "neon":
        return isDark 
          ? "bg-gray-800 shadow-inner" 
          : "bg-gray-200 shadow-inner"
      default:
        return isDark 
          ? "bg-gray-800" 
          : "bg-gray-200"
    }
  }

  const getRangeBackground = () => {
    switch (variant) {
      case "gradient":
        return "bg-gradient-to-r from-brand-500 via-brand-400 to-blue-500"
      case "neon":
        return isDark 
          ? "bg-brand-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]" 
          : "bg-brand-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]"
      default:
        return "bg-brand-500"
    }
  }

  const getThumbClasses = () => {
    const baseClasses = "block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-all duration-300 hover:scale-110 focus:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    switch (variant) {
      case "gradient":
        return cn(baseClasses, "bg-gradient-to-br from-white to-gray-200 dark:from-gray-700 dark:to-gray-900 shadow-md")
      case "neon":
        return cn(baseClasses, isDark 
          ? "border-brand-500 shadow-[0_0_10px_rgba(34,197,94,0.7)]" 
          : "border-brand-500 shadow-[0_0_5px_rgba(34,197,94,0.5)]")
      default:
        return baseClasses
    }
  }

  return (
    <div 
      className="relative py-6" 
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <SliderPrimitive.Root
        ref={ref}
        className={cn(
          "relative flex w-full touch-none select-none items-center",
          className
        )}
        onValueChange={handleValueChange}
        {...props}
      >
        <SliderPrimitive.Track 
          className={cn(
            "relative h-2 w-full grow overflow-hidden rounded-full",
            getTrackBackground()
          )}
        >
          <SliderPrimitive.Range className={cn(
            "absolute h-full will-change-transform",
            getRangeBackground()
          )} />
        </SliderPrimitive.Track>
        {props.value?.map((_, i) => (
          <SliderPrimitive.Thumb 
            key={i}
            className={getThumbClasses()}
          >
            {showTooltip && (
              <div 
                className={cn(
                  "absolute -top-10 left-1/2 -translate-x-1/2 transform whitespace-nowrap rounded px-2 py-1 text-xs font-medium transition-all duration-200",
                  hovering ? "opacity-100 scale-100" : "opacity-0 scale-95",
                  isDark 
                    ? "bg-gray-800 text-gray-100 border border-gray-700" 
                    : "bg-white text-gray-800 border border-gray-200 shadow-md"
                )}
              >
                {formatTooltip(values[i])}
                <div className={cn(
                  "absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 transform",
                  isDark ? "bg-gray-800 border-b border-r border-gray-700" : "bg-white border-b border-r border-gray-200"
                )} />
              </div>
            )}
          </SliderPrimitive.Thumb>
        ))}
      </SliderPrimitive.Root>
    </div>
  )
})
InteractiveSlider.displayName = "InteractiveSlider"

export { InteractiveSlider }
