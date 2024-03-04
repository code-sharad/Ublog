import Avatar from "./Avatar";

function AppBar() {
  return (
    <nav className="flex text-xl  justify-between px-12 items-center py-4 border-b-2 border-gray-200">
      <div>Medium</div>
      <div>
        <Avatar name="Nikhil" size="big" />
      </div>
    </nav>
  );
}

export default AppBar;
