"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/ui/components/Button";
import { Calendar } from "@/ui/components/Calendar";
import * as SubframeCore from "@subframe/core";
import { IconButton } from "@/ui/components/IconButton";
import { Badge } from "@/ui/components/Badge";
import { Table } from "@/ui/components/Table";
import { useRouter } from "next/navigation";
import { format, parseISO } from "date-fns";
import axios from "axios";


function DashboardWithTable() {
  const [inventory, setInventory] = useState([]);
  const [predictedBookings, setPredictedBookings] = useState(null);
  const [predictedCancellations, setPredictedCancellations] = useState(null);
  const router = useRouter();
  const today = new Date();
  const formattedToday = format(today, "MM/dd/yy");
  const weekDay = format(today, "EEEE");

  useEffect(() => {
    const userId = localStorage.getItem("id");
    if (!userId) return;

    axios
      .get(`http://127.0.0.1:8000/user/get_inventory/?id=${userId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setInventory(res.data))
      .catch((err) => console.error("Error fetching inventory:", err));

      axios
      .get("http://localhost:8000/api/predict/")
      .then((res) => {
        setPredictedBookings(res.data.predicted_bookings);
        setPredictedCancellations(res.data.predicted_cancellations);
      })
      .catch((err) => console.error("Error fetching predictions:", err));
  }, []);

  return (
    <div className="w-[100vw] min-h-screen bg-white">
      <div className="flex h-full w-full flex-col items-start gap-6 bg-default-background px-6 py-6 mobile:container mobile:max-w-none">
        <div className="flex w-full items-start">
          <img
            className="flex-none"
            src="https://res.cloudinary.com/subframe/image/upload/v1739949962/uploads/282/bjccj7sjy8q8kzzjpbpp.png"
            alt="Hotel Banner"
          />
        </div>

        <div className="flex w-full flex-wrap items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="neutral-tertiary"
              icon="FeatherLocateFixed"
              iconRight="FeatherChevronDown"
            >
              Prakash Hotel, Roorkee, Uttarakhand
            </Button>

            <SubframeCore.Popover.Root>
              <SubframeCore.Popover.Trigger asChild={true}>
                <Button variant="neutral-secondary" iconRight="FeatherCalendar">
                  {formattedToday}
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
            <IconButton
              icon="FeatherRefreshCw"
              onClick={() => window.location.reload()}
            />
            <IconButton
              icon="FeatherSettings"
              onClick={() => router.push("/inventory")}
            />
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
                {predictedBookings ?? "Loading..."}
                </span>
                <SubframeCore.Icon
                  className="text-body-bold font-body-bold text-default-font"
                  name="FeatherEdit"
                />
              </div>
            </div>
          </div>

          <div className="flex grow shrink-0 basis-0 flex-col items-start gap-4 rounded-md border border-solid border-neutral-border bg-default-background px-4 py-4 shadow-sm">
            <span className="line-clamp-1 w-full text-caption-bold font-caption-bold text-error-700">
              Cancellation
            </span>
            <div className="flex w-full flex-col items-start gap-2">
              <span className="text-heading-2 font-heading-2 text-default-font">
              {predictedCancellations ?? "Loading..."}
              </span>
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
            {inventory.map((item, idx) => (
              <Table.Row key={idx}>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body-bold font-body-bold text-default-font">
                    {item.name}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    {item.order_frequency.toLowerCase()}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <span className="whitespace-nowrap text-body font-body text-neutral-500">
                    ₹ {item.price}
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Badge>{item.daily_quantity}</Badge>
                </Table.Cell>
                <Table.Cell>
                  <Button variant="brand-secondary" onClick={() => {}}>
                  Order {Math.floor((predictedBookings - predictedCancellations) * item.daily_quantity)} {item.name}{" "}
                  {item.order_frequency.toLowerCase() === "daily"
                      ? "Today"
                      : `on ${weekDay}`}
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export default DashboardWithTable;
