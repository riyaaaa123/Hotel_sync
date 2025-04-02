"use client";
/*
 * Documentation:
 * Bar Chart — https://app.subframe.com/bbabae4cea8b/library?component=Bar+Chart_4d4f30e7-1869-4980-8b96-617df3b37912
 */

import React from "react";
import * as SubframeCore from "@subframe/core";

interface BarChartRootProps
  extends React.ComponentProps<typeof SubframeCore.BarChart> {
  stacked?: boolean;
  className?: string;
}

const BarChartRoot = React.forwardRef<HTMLElement, BarChartRootProps>(
  function BarChartRoot(
    { stacked = false, className, ...otherProps }: BarChartRootProps,
    ref
  ) {
    return (
      <SubframeCore.BarChart
        className={SubframeCore.twClassNames("h-80 w-full", className)}
        ref={ref as any}
        stacked={stacked}
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

export const BarChart = BarChartRoot;
