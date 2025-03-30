import type { Meta, StoryObj } from "@storybook/react";
import Header from "./Header";

const meta = {
  title: "Components/Header",
  component: Header,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
    layout: "fullscreen",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 헤더 상태
export const Default: Story = {
  args: {}, // Header 컴포넌트가 현재 props를 받지 않으므로 빈 객체
};

// 모바일 뷰
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
