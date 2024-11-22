"use client";
import { searchFilter, whatsappData } from "@/app/actions/actions";
import React, { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Message {
  userId: string;
  userName: string;
  sent_at: Date;
  received_at: Date;
  message_sent: string;
  message_received: string;
}

const NewMessages = () => {
  const [data, setData] = useState<Message[] | undefined>([]);
  const [selectedItems, setSelectedItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searching, setSearching] = useState(false);
  const pageSize = 6;

  const Search = () => {
    const handleSearch = useDebouncedCallback((query: string) => {
      const search = async () => {
        setSearching(true);
        const text = await searchFilter(query);
        setLoading(true);
        setData(text);
        setLoading(false);
      };
      search();
    }, 500);

    return (
      <div className="flex flex-1 flex-shrink max-w-60 relative">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
          placeholder="Search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
      </div>
    );
  };

  const handleCheckboxChange = useCallback(
    (message: Message, isChecked: boolean) => {
      setSelectedItems((prevSelected) => {
        const updatedSelected = isChecked
          ? [...prevSelected, message]
          : prevSelected.filter((item) => item !== message);
        console.log(updatedSelected);

        return updatedSelected;
      });
    },
    []
  );

  const ExportXlsx = async (title?: string, worksheetname?: string) => {
    try {
      setLoading(true);
      // Check if the action result contains data and if it's an array
      if (selectedItems && Array.isArray(selectedItems)) {
        const dataToExport = selectedItems.map((message: any) => ({
          UserId: message.userId,
          UserName: message.userName,
          TimeSent: new Date(message.sent_at).toLocaleString("en-US", {
            hour12: true,
          }),
          MessageSent: message.message_sent,
          MessageReceived: message.message_received,
          TimeReceived: new Date(message.sent_at).toLocaleString("en-US", {
            hour12: true,
          }),
        }));
        // Create Excel workbook and worksheet
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils?.json_to_sheet(dataToExport);
        XLSX.utils.book_append_sheet(workbook, worksheet, worksheetname);
        // Save the workbook as an Excel file
        XLSX.writeFile(workbook, `${title}.xlsx`);
        console.log(`Exported data to ${title}.xlsx`);
        setLoading(false);
      } else {
        setLoading(false);
        console.log("#==================Export Error");
      }
    } catch (error: any) {
      setLoading(false);
      console.log("#==================Export Error", error.message);
    }
  };

  const fetch = async (page: number) => {
    setLoading(true);
    const start = (page - 1) * pageSize;
    const end = start + pageSize - 1;
    const data = await whatsappData(start, end);
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetch(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="flex flex-col p-8 overflow-auto w-full">
      <header className="flex items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Messages</h1>
        <button
          onClick={() => fetch(currentPage)}
          className="group py-1 overflow-hidden rounded-3xl bg-blue-500 px-3 text-neutral-50 transition hover:bg-blue-400 font-semibold text-sm"
        >
          {loading ? "Loading..." : "Refresh"}
        </button>
        <button
          onClick={() => ExportXlsx("Messages", "MessageExport")}
          className="group py-1 overflow-hidden rounded-3xl bg-green-500 px-3 text-neutral-50 transition hover:bg-green-400 font-semibold text-sm"
        >
          {loading ? "Loading..." : "Export"}
        </button>
        <Search />
      </header>
      <Table className="table-auto">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead className="text-neutral-700">Contact</TableHead>
            <TableHead className="text-neutral-700">Name</TableHead>
            <TableHead className="text-neutral-700">Time Sent</TableHead>
            <TableHead className="text-neutral-700">Message Sent</TableHead>
            <TableHead className="text-neutral-700">Message Received</TableHead>
            <TableHead className="text-neutral-700">Time Received</TableHead>
          </TableRow>
        </TableHeader>
        {data && data.length > 0 ? (
          <TableBody>
            {data.map((message: any, index) => (
              <TableRow key={index} className="">
                <TableCell>
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      handleCheckboxChange(message, e.target.checked)
                    }
                  />
                </TableCell>
                <TableCell>
                  {message.userId.toString().slice(0, 5) + "*****"}
                </TableCell>
                <TableCell>
                  {message.userName.toString().slice(0, 3) + "*****"}
                </TableCell>
                <TableCell>
                  {new Date(message.sent_at).toLocaleString("en-US", {
                    hour12: true,
                  })}
                </TableCell>
                <TableCell className="min-w-[200px] max-w-[200px] whitespace-normal break-words overflow-hidden">
                  {message.message_sent}
                </TableCell>
                <TableCell className="min-w-[200px] max-w-[500px] whitespace-normal break-words overflow-hidden">
                  {message.message_received as string}
                </TableCell>
                <TableCell>
                  {new Date(message.received_at).toLocaleString("en-US", {
                    hour12: true,
                  })}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
              <TableCell>
                <div className="w-full h-5 bg-gray-200 animate-pulse rounded-full" />
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>

      {!searching && (
        <div className="flex justify-center gap-8 mt-4">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className={`group h-10 overflow-hidden rounded-md px-6 text-neutral-50 transition ${
              currentPage === 1
                ? "bg-gray-300"
                : "bg-blue-500 hover:bg-blue-600"
            } font-semibold`}
          >
            Previous
          </button>
          <button
            onClick={handleNextPage}
            className="group h-10 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600 font-semibold"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NewMessages;
