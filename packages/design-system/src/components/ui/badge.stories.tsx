import type { Meta } from "@storybook/react-vite";

import { Badge } from "./badge";

const meta = {
  component: Badge,
  title: "Design System/Badge",
} satisfies Meta<typeof Badge>;

// oxlint-disable-next-line import/no-default-export
export default meta;

export const Default = {
  args: {
    children: "Default",
    variant: "default",
  },
};

export const Secondary = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Outline = {
  args: {
    children: "Outline",
    variant: "outline",
  },
};

export const Destructive = {
  args: {
    children: "Destructive",
    variant: "destructive",
  },
};
