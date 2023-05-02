import React from 'react';

const Transactions = ({ transaction }) => {
  console.log(transaction);
  return (
    <div className="card-container">
      {transaction.map((el, index) => (
        <div className="card">
          <p className="card-info" key={index}>
            Sender: {el.sender.slice(0, 12)}, Recipient:{' '}
            {el.recipient.slice(0, 12)}, Amount: {el.amount}, Timestamp:
            {el.timeStamp}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Transactions;
