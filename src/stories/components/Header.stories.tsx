import type { Meta, StoryObj } from "@storybook/react";
import Header from "../../app/components/Header";

const meta = {
  title: "Components/Common/Header",
  component: Header,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof Header>;

export const Default: Story = {
  args: {},
};
