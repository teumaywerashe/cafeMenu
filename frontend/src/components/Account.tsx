import React, { useState } from "react";
import { FaCopy, FaCheck, FaUniversity, FaMobileAlt } from "react-icons/fa";

interface AccountInfo {
  id: number;
  ownerName: string;
  bank: string;
  accountNumber: string;
  type: string;
  theme: string;
}

function Account() {
  const accounts: AccountInfo[] = [
    { id: 1, ownerName: "Sara Damtew Teka", bank: "CBE", accountNumber: "10038989498979489", type: "bank", theme: "from-purple-700 to-purple-900" },
    { id: 2, ownerName: "Sara Damtew Teka", bank: "Telebirr", accountNumber: "0911234567", type: "mobile", theme: "from-sky-400 to-blue-600" },
    { id: 3, ownerName: "Sara Damtew Teka", bank: "Awash Bank", accountNumber: "89898430905080394", type: "bank", theme: "from-blue-800 to-blue-900" },
    { id: 4, ownerName: "Sara Damtew Teka", bank: "CBE", accountNumber: "10038989498979489", type: "bank", theme: "from-purple-700 to-purple-900" },
    { id: 5, ownerName: "Sara Damtew Teka", bank: "Telebirr", accountNumber: "0911234567", type: "mobile", theme: "from-sky-400 to-blue-600" },
  ];

  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }).catch((err) => console.error("Failed to copy!", err));
  };

  return (
    <section id="accounts" className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Payment Options</h2>
          <p className="text-gray-500 mt-2">Use the accounts below to complete your transaction.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {accounts.map((acc) => (
            <div
              key={acc.id}
              className={`relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br ${acc.theme} p-6 text-white group transform hover:-translate-y-2 transition-all duration-300`}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-10 rounded-full blur-2xl group-hover:opacity-20 transition-opacity"></div>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-bold text-xl tracking-wide">{acc.bank}</h3>
                  <p className="text-xs text-white/70 uppercase tracking-wider">Payment Method</p>
                </div>
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  {acc.type === "mobile" ? <FaMobileAlt size={20} /> : <FaUniversity size={20} />}
                </div>
              </div>

              <div className="mb-6">
                <p className="text-xs text-white/60 mb-1">Account Number</p>
                <div className="flex items-center justify-between bg-black/20 rounded-lg p-3 backdrop-blur-sm border border-white/10">
                  <span className="font-mono text-lg tracking-wider truncate mr-2">{acc.accountNumber}</span>
                  <button
                    onClick={() => handleCopy(acc.accountNumber, acc.id)}
                    className="flex items-center justify-center w-8 h-8 bg-white/10 hover:bg-white text-white hover:text-gray-900 rounded-md transition-all active:scale-95"
                    title="Copy Number"
                  >
                    {copiedId === acc.id ? <FaCheck size={14} className="text-green-500" /> : <FaCopy size={14} />}
                  </button>
                </div>
                {copiedId === acc.id && (
                  <span className="text-xs text-green-300 font-bold absolute right-8 mt-1 animate-pulse">Copied!</span>
                )}
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold">
                  {acc.ownerName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase">Account Owner</p>
                  <p className="text-sm font-medium capitalize">{acc.ownerName}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Account;
