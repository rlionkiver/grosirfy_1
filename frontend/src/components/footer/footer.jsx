const Footer = () => {
  return (
    <div className="w-[84.8%]  bg-gray-100 ml-0 sm:ml-64 mt-[100%] flex flex-col justify-center  font-bold">
      <hr className="mt-[20px] h-3 w-[100%] " />
      <div className="flex bg-gray-100 w-60% mb-5 mt-2">
        <p className="w-[30%] mr-[70%] ml-5 ">&copy;2024 - Grosirfy</p>
        <a className="w-[10%] -ml-10 " href="">
          About Us
        </a>
        <a className="w-[10%]" href="">
          Contact Us
        </a>
      </div>
    </div>
  );
};

export default Footer;
