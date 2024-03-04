import Auth from "../componentss/Auth";
import Quotes from "../componentss/Quotes";

function Signup() {
  return (
    <div className="overflow-hidden  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-white">
      <Auth type="signup" />
      <div className="hidden sm:visible md:block lg:block ">
        <Quotes />
      </div>
    </div>
  );
}

export default Signup;
