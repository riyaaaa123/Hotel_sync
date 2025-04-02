"use client";
/*
 * Documentation:
 * Pie Chart — https://app.subframe.com/bbabae4cea8b/library?component=Pie+Chart_0654ccc7-054c-4f3a-8e9a-b7c81dd3963c
 */

import React from "react";
import * as SubframeCore from "@subframe/core";

interface PieChartRootProps
  extends React.ComponentProps<typeof SubframeCore.PieChart> {
  className?: string;
}

const PieChartRoot = React.forwardRef<HTMLElement, PieChartRootProps>(
  function PieChartRoot({ className, ...otherProps }: PieChartRootProps, ref) {
    return (
      <SubframeCore.PieChart
        className={SubframeCore.twClassNames("h-52 w-52", className)}
        ref={ref as any}
        colors={[
          "#8b5cf6",
          "#ddd6fe",
          "#7c3aed",
          "#c4b5fd",
          "#6d28d9",
          "#a78bfa",
        ]}
        {...otherProps}
      />
    );
  }
);

export const PieChart = PieChartRoot;
