import React from 'react';

const Transactions = ({ transaction }) => {
  const reversedTransaction = [...transaction].reverse();
  return (
    <div className="flex flex-wrap justify-center p-16 text-black ">
      {reversedTransaction.map((el, index) => (
        <div
          className="w-60   bg-slate-400 gap-12 m-4 p-3 rounded-md"
          key={index}
        >
          <div className="flex justify-between">
            <p>Sender</p>
            <p className="p-1 text-black ">{el.sender.slice(0, 12)}</p>
          </div>
          <div className="flex justify-between">
            <p>Received</p>
            <p className="p-1 text-black ">{el.recipient.slice(0, 12)}</p>
          </div>
          <div className="flex justify-between">
            <p>Date</p>
            <p className="p-1 text-black ">{el.timeStamp.slice(0, 12)}</p>
          </div>
          <div className="flex justify-between">
            <p>Time</p>
            <p className="p-1 text-black ">{el.timeStamp.slice(11)}</p>
          </div>
          <div className="flex justify-between">
            <p>Your Balance</p>
            <p className="p-1 text-black "> {el.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
