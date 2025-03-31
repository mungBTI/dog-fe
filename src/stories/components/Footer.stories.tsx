import type { Meta, StoryObj } from "@storybook/react";
import Footer from "../../app/components/Footer";

const meta = {
  title: "Components/Common/Footer",
  component: Footer,
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

export const Default: Story = {
  args: {},
};
