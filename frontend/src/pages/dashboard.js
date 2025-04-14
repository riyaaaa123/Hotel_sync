"use client";

import React from "react";
import { Button } from "@/ui/components/Button";
import { Calendar } from "@/ui/components/Calendar";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { Badge } from "@/ui/components/Badge";
import { Table } from "@/ui/components/Table";
import { useRouter } from "next/navigation";

function DashboardWithTable() {
  const router = useRouter();
  return (
    <div className="w-[100vw] min-h-screen bg-white">
      <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background px-6 py-6 mobile:container mobile:max-w-none">
        <div className="flex w-full items-start">
          <img
            className="flex-none"
            src="https://res.cloudinary.com/subframe/image/upload/v1739949962/uploads/282/bjccj7sjy8q8kzzjpbpp.png"
          />
        </div>
        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="neutral-tertiary"
              icon="FeatherLocateFixed"
              iconRight="FeatherChevronDown"
              onClick={() => {}}
            >
              Prakash Hotel, Roorkee, Uttarakhand
            </Button>
            <SubframeCore.Popover.Root>
              <SubframeCore.Popover.Trigger asChild={true}>
                <Button
                  variant="neutral-secondary"
                  iconRight="FeatherCalendar"
                  onClick={() => {}}
                >
                  12/31/23
                </Button>
              </SubframeCore.Popover.Trigger>
              <SubframeCore.Popover.Portal>
                <SubframeCore.Popover.Content
                  side="bottom"
                  align="start"
                  sideOffset={4}
                  asChild={true}
                >
                  <div className="flex flex-col items-start gap-1 rounded-md border border-solid border-neutral-border bg-default-background px-3 py-3 shadow-lg">
                    <Calendar
                      mode={"single"}
                      selected={new Date()}
                      onSelect={() => {}}
                    />
                  </div>
                </SubframeCore.Popover.Content>
              </SubframeCore.Popover.Portal>
            </SubframeCore.Popover.Root>
          </div>
          <div className="flex items-center gap-2">
            <IconButton icon="FeatherRefreshCw" onClick={() => {}} />
            <IconButton icon="FeatherSettings" onClick={() => {router.push('/inventory')}} />
          </div>
        </div>
        <div className="flex w-full flex-wrap items-start gap-4">
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-success-700">
              Expected Footfall
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <div className="flex items-center gap-2">
                <span className="text-heading-2 font-heading-2 text-default-font">
                  3,203
                </span>
                <SubframeCore.Icon
                  className="text-body-bold font-body-bold text-default-font"
                  name="FeatherEdit"
                />
              </div>
              <Badge variant="success" icon="FeatherArrowUp">
                13% than last week
              </Badge>
            </div>
          </div>
          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-error-700">
              Cancellation
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
                123
              </span>
              <Badge variant="error" icon="FeatherArrowDown">
                33% than last week
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col items-start gap-2 rounded-md border border-solid border-neutral-border bg-default-background shadow-sm overflow-auto">
          <Table
            header={
              <Table.HeaderRow>
                <Table.HeaderCell>Inventory</Table.HeaderCell>
                <Table.HeaderCell>Frequency</Table.HeaderCell>
                <Table.HeaderCell>Amount</Table.HeaderCell>
                <Table.HeaderCell>Quantity Required</Table.HeaderCell>
                <Table.HeaderCell>Action</Table.HeaderCell>
              </Table.HeaderRow>
            }
          >
            <Table.Row>
              <Table.Cell>
                <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                  Vegetables
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Daily
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  ₹ 1240
                </span>
              </Table.Cell>
              <Table.Cell>
                <Badge>20 KG</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button variant="brand-secondary" onClick={() => {}}>
                  Order 20 KG Vegetables Today
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                  Hand Wash
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Weekly
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  ₹ 900
                </span>
              </Table.Cell>
              <Table.Cell>
                <Badge>10</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button variant="brand-secondary" onClick={() => {}}>
                  Order 10 Handwash on 25 Feb 2025
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                  Friuts
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Daily
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  ₹ 1500
                </span>
              </Table.Cell>
              <Table.Cell>
                <Badge>10 KG</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button variant="brand-secondary" onClick={() => {}}>
                  Order 10 KG Fruits Tomorrow
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                  Water Bottle
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Weekly
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  ₹ 2000
                </span>
              </Table.Cell>
              <Table.Cell>
                <Badge>50</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button variant="brand-secondary" onClick={() => {}}>
                  Order 50 Water Bottles on 27 Feb 2025
                </Button>
              </Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>
                <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                  Soaps
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  Daily
                </span>
              </Table.Cell>
              <Table.Cell>
                <span className="whitespace-nowrap text-body font-body text-neutral-500">
                  ₹ 500
                </span>
              </Table.Cell>
              <Table.Cell>
                <Badge>30</Badge>
              </Table.Cell>
              <Table.Cell>
                <Button variant="brand-secondary" onClick={() => {}}>
                  Order 30 Soaps on 28 Feb 2025
                </Button>
              </Table.Cell>
            </Table.Row>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DashboardWithTable;
