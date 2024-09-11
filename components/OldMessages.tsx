"use client";

import { cleanedData } from "@/data/output";
import React, { useCallback, useEffect, useRef, useState } from "react";
import * as XLSX from "xlsx";
interface Message {
  Account: string;
  Incoming: string;
  IncomingTime: string;
  Outgoing: string;
  OutgoingTime: string;
}

const OldMessages = () => {
  const [selectedItems, setSelectedItems] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = useCallback(
    (message: Message, isChecked: boolean) => {
      setSelectedItems((prevSelected) => {
        const updatedSelected = isChecked
          ? [...prevSelected, message]
          : prevSelected.filter((item) => item !== message);

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
        const dataToExport = selectedItems.map((pro: any) => ({
          User: pro.Account,
          TimeSent: pro.IncomingTime,
          MessageSent: pro.Incoming,
          MessageReceived: pro.Outgoing,
          TimeReceived: pro.OutgoingTime,
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

  const sortedData = [...cleanedData].sort((a, b) => {
    return (
      new Date(b.IncomingTime).getTime() - new Date(a.IncomingTime).getTime()
    );
  });

  const refPagination = useRef<HTMLDivElement>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of items to show per page

  // Calculate the indices of the items to display
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total pages
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    refPagination.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  return (
    <div className="flex flex-1 flex-col p-8 overflow-auto w-full">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <button
          onClick={() => ExportXlsx("Messages", "MessageExport")}
          className="group relative h-12 overflow-hidden rounded-md bg-blue-500 px-6 text-neutral-50 transition hover:bg-blue-600 font-semibold"
        >
          <span className="relative">{loading ? "Loading..." : "Export"}</span>
        </button>
      </header>
      <div className="bg-white rounded-xl p-4 shadow w-full flex flex-col">
        <div className="grid grid-cols-[0.3fr_1fr_1fr_2fr_2fr_1fr] gap-4 px-4">
          <h1 className="font-semibold">{""}</h1>
          <h1 className="font-semibold">Users</h1>
          <h1 className="font-semibold">Time Sent</h1>
          <h1 className="font-semibold">Message Sent</h1>
          <h1 className="font-semibold">Message Received</h1>
          <h1 className="font-semibold  text-right">Time Received</h1>
        </div>
        <div className="space-y-2 mt-4 font-semibold">
          {currentItems.map((message, index) => (
            <div
              key={index}
              className="p-4 bg-gray-50 rounded-lg grid grid-cols- grid-cols-[0.3fr_1fr_1fr_2fr_2fr_1fr] gap-2 border border-border"
            >
              <input
                type="checkbox"
                className="w-4 h-4"
                onChange={(e) =>
                  handleCheckboxChange(message, e.target.checked)
                }
              />
              <p className="text-gray-700 ">{message.Account}</p>
              <p className="text-gray-700 ">
              {new Date(message.IncomingTime).toLocaleString("en-US", {
                    hour12: true,
                  })}
              </p>
              <p className="text-gray-700 ">{message.Incoming}</p>
              <p className="text-gray-700 text-justify">{message.Outgoing}</p>
              <p className="text-gray-700 text-right">
              {new Date(message.OutgoingTime).toLocaleString("en-US", {
                    hour12: true,
                  })}
              </p>
            </div>
          ))}
        </div>

        <div className="flex justify-center space-x-2 mt-4" ref={refPagination}>
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-200 rounded">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OldMessages;
