const TextHeader = ({ title, subtitle }) => {
  return (
    <>
      <h1 className="md:text-[35px] text-[25px] font-bold capitalize">
        {title}
      </h1>
      {subtitle && <p className="md:text-[15px] subtitle">{subtitle}</p>}
    </>
  );
};

export default TextHeader;
