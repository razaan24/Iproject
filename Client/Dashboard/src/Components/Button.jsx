export default function Button({ nameProp }) {
  return (
    <>
      <button className="w-full py-2 bg-black text-white rounded-lg ">
        {nameProp}
      </button>
    </>
  );
}
