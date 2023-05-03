// import { useState } from 'react';
// import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
// import { generatedKeysObject } from '../../utils/constants';

// const Keys = () => {
//   const [visiblePasswordIndex, setVisiblePasswordIndex] = useState(null);

//   const handleTogglePasswordVisibility = (index) => {
//     if (visiblePasswordIndex === index) {
//       setVisiblePasswordIndex(null);
//     } else {
//       setVisiblePasswordIndex(index);
//     }
//   };

//   return (
//     <>
//       <div className="flex gap-4 bg-slate-300 m-6 rounded-lg border-solid p-3 ">
//         <div className=" text-slate-800  p-6 pt-0 w-[700px] h-[180px] ">
//           <p>Private keys</p>
//           {
//             <div className="flex flex-col violet-gradient rounded-lg ">
//               {Object.values(generatedKeysObject).map((el, index) => (
//                 <div className="flex flex-wrap h-8 p2" key={index}>
//                   <p className="w-full break-all ">{`[${index}]  ${el.private}`}</p>
//                   <div className="h-[0.1px] bg-black  w-full" />
//                 </div>
//               ))}
//             </div>
//           }
//         </div>
//         <div className=" text-slate-800  p-6 pt-0 w-[700px] h-[180px] ">
//           <p>Public keys</p>
//           {
//             <div className="flex flex-col violet-gradient rounded-lg">
//               {Object.values(generatedKeysObject).map((el, index) => (
//                 <div className="flex flex-wrap h-12 p2" key={index}>
//                   <p className="w-full break-all p2">{`[${index}]  ${el.public}`}</p>
//                   <div className="h-[0.1px] bg-black  w-full" />
//                 </div>
//               ))}
//             </div>
//           }
//         </div>
//       </div>
//     </>
//   );
// };

// export default Keys;
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/solid';
import { generatedKeysObject } from '../../utils/constants';

const Keys = () => {
  const [visiblePasswordIndex, setVisiblePasswordIndex] = useState(null);

  const handleTogglePasswordVisibility = (index) => {
    if (visiblePasswordIndex === index) {
      setVisiblePasswordIndex(null);
    } else {
      setVisiblePasswordIndex(index);
    }
  };

  const privateKeys = Object.values(generatedKeysObject).map(
    (el) => el.private
  );
  const publicKeys = Object.values(generatedKeysObject).map((el) => el.public);
  console.log(publicKeys);
  return (
    <>
      <div className="flex flex-col gap-4 w-[400px] bg-slate-300 m-6 rounded-lg border-solid p-3">
        {privateKeys.map((password, index) => (
          <div
            key={index}
            className="flex items-center flex-  bg-white rounded-lg px-3 py-2 text-slate-700 "
          >
            {visiblePasswordIndex === index ? (
              <p className=" break-all">{password}</p>
            ) : (
              <span className=" p-1">*********************************</span>
            )}
            <button
              onClick={() => handleTogglePasswordVisibility(index)}
              className="focus:outline-none p-1 pl-12"
            >
              {visiblePasswordIndex === index ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4 w-[400px] bg-slate-300 m-6 rounded-lg border-solid p-3">
        {publicKeys.map((password, index) => (
          <div
            key={`${index} +3`}
            className="flex items-start   bg-white rounded-lg px-3 py-2 text-slate-700 "
          >
            {visiblePasswordIndex === `${index} +3` ? (
              <p className=" break-all">{password}</p>
            ) : (
              <span className=" p-1">*********************************</span>
            )}
            <button
              onClick={() => handleTogglePasswordVisibility(`${index} +3`)}
              className="focus:outline-none p-1 pl-12"
            >
              {visiblePasswordIndex === `${index} +3` ? (
                <EyeOffIcon className="h-5 w-5 text-gray-500" />
              ) : (
                <EyeIcon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default Keys;
