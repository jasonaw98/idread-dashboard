import { whatsappStats } from "@/app/actions/actions";

export default async function UserTable() {
  const stats = await whatsappStats();
  const users = stats?.recipientMessageCountArray || [];

  return (
    <div className="flex flex-1 flex-col p-8 overflow-auto w-full h-full">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Total Users</h1>
      </header>
      <div className="bg-white rounded-xl p-4 shadow w-full flex flex-col">
        <table className="w-full">
          <thead>
            <tr>
              <th className="text-left font-semibold">User Id</th>
              <th className="text-left font-semibold">User Name</th>
              <th className="text-left font-semibold">Messages</th>
            </tr>
          </thead>
          <tbody>
            {users &&
              users.map((user, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">{user.key}</td>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.value}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
