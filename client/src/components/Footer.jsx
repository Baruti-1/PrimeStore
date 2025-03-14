const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="text-center bg-dark text-yellow-200">
      &copy; 2024 - {year}
    </div>
  );
};

export default Footer;
