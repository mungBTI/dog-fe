export const textInput = {
  base: `
    w-full
    py-2
    bg-transparent 
    border-0
    border-b
    border-b-gray-300
    text-gray-700
    text-lg
    placeholder:text-gray-400
    outline-none
    focus:outline-none
    focus:ring-0
    focus:border-b-main-yellow
    transition-colors
    duration-300
  ` as const,
  subInput: `
    bg-transparent 
    border-0
    border-b
    border-b-gray-300
    text-gray-700
    text-lg
    text-right
    placeholder:text-gray-400
    outline-none
    focus:outline-none
    focus:ring-0
    focus:border-b-main-yellow
    transition-colors
    duration-300
  ` as const,
} as const;
