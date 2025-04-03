const SideBar: React.FC = () => {
  const date = new Date();
  return (
    <nav className="bg-secondary relative flex h-full flex-col rounded-lg">
      <ul>sidebar tings</ul>
      <span className="absolute bottom-5 self-center text-2xl">
        &copy; Moluno {date.getFullYear()}
      </span>
    </nav>
  );
};

export default SideBar;
