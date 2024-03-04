import Auth from "../componentss/Auth";
import Quotes from "../componentss/Quotes";

function Sigin() {
  return (
    <div className="overflow-hidden  grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 bg-white">
      <Auth type={"signin"} />
      <div className="hidden sm:visible md:block lg:block">
        <Quotes />
      </div>
    </div>
  );
}

export default Sigin;
