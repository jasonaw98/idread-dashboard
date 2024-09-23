"use client";
import { whatsappData } from "@/app/actions/actions";
import React, { useCallback, useEffect, useState } from "react";
import * as XLSX from "xlsx";

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

  const fetch = async () => {
    setLoading(true);
    const data = await whatsappData();
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <div className="flex flex-1 flex-col p-8 overflow-auto w-full">
      <header className="flex items-center mb-8 gap-8">
        <h1 className="text-3xl font-bold">Messages</h1>
        <button
          onClick={() => fetch()}
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
      </header>
      <div className="bg-white rounded-xl p-4 shadow w-full flex flex-col">
        <div className="grid grid-cols-[0.2fr_0.6fr_1fr_1fr_2fr_2fr_1fr] gap-4 px-4">
          <h1 className="font-semibold">{""}</h1>
          <h1 className="font-semibold">Contact</h1>
          <h1 className="font-semibold">Name</h1>
          <h1 className="font-semibold">Time Sent</h1>
          <h1 className="font-semibold">Message Sent</h1>
          <h1 className="font-semibold">Message Received</h1>
          <h1 className="font-semibold  text-right">Time Received</h1>
        </div>
        <div className="space-y-2 mt-4 font-semibold">
          {data &&
            data.map((message, index) => (
              <div
                key={index}
                className="p-4 bg-gray-50 rounded-lg grid grid-cols- grid-cols-[0.2fr_0.6fr_1fr_1fr_2fr_2fr_1fr] gap-2 border border-border"
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
                <p className="text-gray-700 ">{message.message_sent}</p>
                <p className="text-gray-700 text-justify">
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

        {/* <div className="flex justify-center space-x-2 mt-4" ref={refPagination}>
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
      </div> */}
      </div>
    </div>
  );
};

export default NewMessages;
