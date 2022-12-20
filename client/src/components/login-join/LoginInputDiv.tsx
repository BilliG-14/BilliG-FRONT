import React from 'react';

type InputProps = {
  type?: string;
  placeholder?: string;
  label?: string;
  id: string;
};

export function LoginInputDiv({
  type = 'text',
  placeholder = '',
  label,
  id,
}: InputProps) {
  return (
    <div
      className={`w-full flex flex-col justify-center items-center
      ${label ? 'mb-1' : 'mb-8'}`}
    >
      {label ? (
        <label
          htmlFor={id}
          className="block text-b-yellow font-bold text-lg w-full my-auto text-left"
        >
          {label}
        </label>
      ) : (
        ''
      )}
      <input
        id={id}
        name={id}
        className="block w-full h-10 text-xl border-b-yellow border-solid border-2 rounded-xl px-4 text-yellow-900 font-bold
        focus:outline-none focus:ring-2 focus:ring-amber-500"
        type={type}
        placeholder={placeholder}
      ></input>
    </div>
  );
}
