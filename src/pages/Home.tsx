import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="Hello">
        <h1>Lucky Draw!</h1>
      </div>
      <div className="Hello">
        <Link to="/NewDraw">
          <button type="button">
            <span role="img" aria-label="books">
              💰
            </span>
            New Draw
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
