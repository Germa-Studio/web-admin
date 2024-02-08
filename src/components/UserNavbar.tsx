import React from 'react';

export default function UserNavbar() {
  const [navbar, setNavbar] = React.useState(false);
  // const [activeDropdown, setActiveDropdown] = React.useState(null);

  // eslint-disable-next-line no-unused-vars
  // const toggleDropdown = (dropdown) => {
  //   setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  // };
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <nav
      className={`w-full shadow fixed top-0 left-0 z-50 px-6 md:px-0 ${
        isScrolled ? 'bg-white' : 'bg-white'
      }`}>
      <div className="justify-between bg-white mx-auto lg:max-w-7xl md:items-center md:flex">
        <div className="bg-white">
          <div className="flex items-center justify-between py-2 md:py-3 md:block">
            <a href="/">
              <img
                className="hidden md:block"
                src="/image/logo-navbar.png"
                width={200}
                alt="Logo"
              />
              <img className="md:hidden" src="/image/logo-navbar.png" width={150} alt="Logo" />
            </a>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                onClick={() => setNavbar(!navbar)}>
                {navbar ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
        <div>
          <div
            className={`flex-1 justify-self-center py-3 px-10 mt-8 md:block md:pb-0 md:mt-0 ${
              navbar ? 'block' : 'hidden'
            }`}>
            <ul className="text-green-primary items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
              <li onClick={() => (window.location.href = '/')}>
                <button className="hover:font-bold hover:underline underline-offset-auto">
                  <span className="flex items-center justify-center">
                    <img
                      className="w-12"
                      src="/image/icon-data-pertanian.png"
                      alt="logo data pertanian"
                    />
                    <p className="text-sm md:text-base">Data Pertanian</p>
                  </span>
                </button>
              </li>
              <li onClick={() => (window.location.href = '/info-pertanian')}>
                <button className="hover:font-bold hover:underline underline-offset-auto">
                  <span className="flex items-center justify-center">
                    <img
                      className="w-12"
                      src="/image/icon-info-pertanian.png"
                      alt="logo data pertanian"
                    />
                    <p className="text-sm md:text-base">Info Pertanian</p>
                  </span>
                </button>
              </li>
              <li onClick={() => (window.location.href = '/toko-pertanian')}>
                <button className="hover:font-bold hover:underline underline-offset-auto">
                  <span className="flex items-center justify-center">
                    <img
                      className="w-12"
                      src="/image/icon-toko-pertanian.png"
                      alt="logo data pertanian"
                    />
                    <p className="text-sm md:text-base">Toko Pertanian</p>
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
        <a
          href="/login"
          className="hidden md:block bg-green-primary text-white px-4 py-2 rounded-md font-bold">
          Login
        </a>
      </div>
    </nav>
  );
}
