export const layout = {
  flex: {
    list: {
      full: "flex flex-col w-full h-full",
    },
    column: {
      center: "flex flex-col items-center justify-center",
      fullWidth: "flex flex-col w-full",
    },
    row: {
      center: "flex flex-row items-center justify-center",
      fullWidth: "flex flex-row w-full",
      between: "flex flex-row items-center justify-between",
    },
  },
} as const;
