import { useNavigate } from 'react-router-dom';

export default function Carousels() {
  const navigate = useNavigate();
  return (
    <div className="carousel max-w-screen-2xl h-2/5 m-auto">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src={`${process.env.PUBLIC_URL}/img/carousel1.png`}
          alt="IT"
          className="w-full cursor-pointer"
          onClick={() => {
            navigate('/products/lend/63a16fcf1027a8c93f03addc');
          }}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <img
          src={`${process.env.PUBLIC_URL}/img/carousel2.png`}
          alt="camping"
          className="w-full cursor-pointer"
          onClick={() => {
            navigate('/products/lend/63a16fe01027a8c93f03ade0');
          }}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <img
          src={`${process.env.PUBLIC_URL}/img/carousel3.png`}
          alt="ski"
          className="w-full cursor-pointer"
          onClick={() => {
            navigate('/products/lend/63a16fe91027a8c93f03ade2');
          }}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <img
          src={`${process.env.PUBLIC_URL}/img/carousel4.png`}
          alt="insurance"
          className="w-full cursor-pointer"
          onClick={() => {
            navigate('/notices/63a99800bceda7b05ae793de');
          }}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
}
