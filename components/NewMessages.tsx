"use client";
import { searchFilter, whatsappData } from "@/app/actions/actions";
import React, { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { useDebouncedCallback } from "use-debounce";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

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
      <div className="relative flex flex-1 max-w-sm">
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
    <div className="flex flex-1 flex-col p-8 overflow-auto w-full">
      <header className="flex items-center mb-8 gap-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <button
          onClick={() => fetch(currentPage)}
          className="group h-10 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600 font-semibold"
        >
          <span className="relative">{loading ? "Loading..." : "Refresh"}</span>
        </button>
        <button
          onClick={() => ExportXlsx("Messages", "MessageExport")}
          className="group h-10 overflow-hidden rounded-md bg-green-500 px-6 text-neutral-50 transition hover:bg-blue-600 font-semibold"
        >
          <span className="relative">{loading ? "Loading..." : "Export"}</span>
        </button>
        <Search />
      </header>
      {true && (
        <div>
          <div className="bg-white pt-2 rounded-xl">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th className="font-semibold">{""}</th>
                  <th className="font-semibold">Contact</th>
                  <th className="font-semibold">Name</th>
                  <th className="font-semibold">Time Sent</th>
                  <th className="font-semibold">Message Sent</th>
                  <th className="font-semibold">Message Received</th>
                  <th className="font-semibold">Time Received</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.map((message, index) => (
                    <tr
                      key={index}
                      className="py-4 bg-slate-50 border-border border"
                    >
                      <td className="px-3">
                        <input
                          type="checkbox"
                          className="w-5 h-5"
                          onChange={(e) =>
                            handleCheckboxChange(message, e.target.checked)
                          }
                        />
                      </td>
                      <td className="px-2 border border-border">
                        {message.userId.toString().slice(0, 5) + "*****"}
                      </td>
                      <td className="px-2 border border-border">
                        {message.userName.toString().slice(0, 3) + "*****"}
                      </td>
                      <td className="text-center min-w-24 border border-border">
                        {new Date(message.sent_at).toLocaleString("en-US", {
                          hour12: true,
                        })}
                      </td>
                      <td className="break-words min-w-[300px] pl-2 border border-border">
                        {message.message_sent}
                      </td>
                      <td className="text-justify break-words p-2 border border-border">
                        {message.message_received}
                      </td>
                      <td className="text-center min-w-24">
                        {new Date(message.received_at).toLocaleString("en-US", {
                          hour12: true,
                        })}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

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
      )}
      {false && (
        <div className="bg-white rounded-xl p-4 shadow w-full flex flex-col">
          <div className="grid grid-cols-[0.2fr_0.6fr_1fr_1fr_2fr_2fr_1fr] gap-4 px-4">
            <h1 className="font-semibold">{""}</h1>
            <h1 className="font-semibold">Contact</h1>
            <h1 className="font-semibold">Name</h1>
            <h1 className="font-semibold">Time Sent</h1>
            <h1 className="font-semibold">Message Sent</h1>
            <h1 className="font-semibold">Message Received</h1>
            <h1 className="font-semibold">Time Received</h1>
          </div>
          <div className="space-y-2 mt-4 font-semibold">
            {data &&
              data?.map((message, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-50 rounded-lg grid grid-cols- grid-cols-[0.2fr_0.4fr_0.5fr_1fr_2fr_minmax(500px,_3fr)_1fr] gap-2 border border-border"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    onChange={(e) =>
                      handleCheckboxChange(message, e.target.checked)
                    }
                  />
                  <p className="text-gray-700 ">
                    {message.userId.toString().slice(0, 5) + "*****"}
                  </p>
                  <p className="text-gray-700 ">
                    {message.userName.toString().slice(0, 3) + "*****"}
                  </p>
                  <p className="text-gray-700 ">
                    {new Date(message.sent_at).toLocaleString("en-US", {
                      hour12: true,
                    })}
                  </p>
                  <p className="text-gray-700 break-words">
                    {message.message_sent}
                  </p>
                  <p className="text-gray-700 text-justify break-words max-w-[450px]">
                    {message.message_received}
                  </p>
                  <p className="text-gray-700 text-right">
                    {new Date(message.received_at).toLocaleString("en-US", {
                      hour12: true,
                    })}
                  </p>
                </div>
              ))}
          </div>

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
      )}
    </div>
  );
};

export default NewMessages;
