import loading from "../images/loading.gif";

import "../css/Loading.css";

function Loading() {
  return (
    <div class="loader_container">
        <img class="loader" src={loading} alt="Loading Image"/>
    </div>
  );
}

export default Loading;
