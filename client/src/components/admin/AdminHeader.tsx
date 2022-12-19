export default function AdminHeader() {
  return (
    <>
      {' '}
      <a href="/admin">
        <p className="max-w-screen-lg mx-auto p-6 text-3xl font-extrabold select-none">
          Admin Page
        </p>
      </a>
      <hr className="border-2 border-b-text-black max-w-screen-lg mx-auto"></hr>
    </>
  );
}
