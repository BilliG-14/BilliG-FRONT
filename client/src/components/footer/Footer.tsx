import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div>
      <footer className="p-4 bg-b-bg-gray shadow md:flex md:items-center md:justify-center md:p-6 dark:bg-gray-800">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          Copyright 2022{' '}
          <Link to="/" className="hover:underline">
            빌려주14죠™
          </Link>
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
}

export default Footer;
