export const ctaButton = {
  base: `
    relative
    m-auto
    px-5
    py-3
    transition-all
    duration-200
    border-none
    bg-transparent
    cursor-pointer
    ease-in-out
  ` as const,

  beforePseudo: `
    absolute
    top-0
    left-0
    block
    rounded-full
    bg-sky-200
    w-11
    h-11
    transition-all
    duration-300
    ease-in-out
  ` as const,

  span: `
    relative
    font-ubuntu
    text-lg
    font-bold
    tracking-wider
    text-slate-700
  ` as const,

  svg: `
    relative
    top-0
    ml-2.5
    fill-none
    stroke-slate-700
    stroke-2
    transform
    -translate-x-1
    transition-all
    duration-300
    ease-in-out
  ` as const,

  // 호버 상태용 클래스들
  hover: {
    beforePseudo: `
      w-full
      bg-sky-200
    ` as const,

    svg: `
      transform
      translate-x-0
    ` as const,
  },

  // 액티브 상태용
  active: `
    transform
    scale-95
  ` as const,
} as const;
