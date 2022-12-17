import React from 'react';

export default function Carousels() {
  return (
    <div className="carousel max-w-screen-2xl h-2/5 m-auto">
      <div id="slide1" className="carousel-item relative w-full">
        <img
          src="https://kream-phinf.pstatic.net/MjAyMjEyMTJfOSAg/MDAxNjcwODIxOTU5ODM3.WbF3eBZoSpLDsbM98NPl9FNSlwOWaNMhFLYN4BToXfUg.xjuwkzJokEo-f1cvqHQWISjdqOi0aiQ9bceoTIBoVnAg.JPEG/a_d1c39c70d89f426da4506a3f77af84d3.jpg?type=m_2560"
          className="w-full"
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
          src="https://kream-phinf.pstatic.net/MjAyMjEyMTVfNzYg/MDAxNjcxMDkyMTA0ODQ3.cwNhir1L0b89EoIBIGSQAkGHESXuBDKVxu4uwXGBxiQg.f2-BK56BSHBD9FTx__bU-HLpB_zf4H75FRgPzNzhZI0g.JPEG/a_eafbf93890f14019b166bb494d090512.jpg?type=m_2560"
          className="w-full"
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
          src="https://kream-phinf.pstatic.net/MjAyMjEyMTJfMzEg/MDAxNjcwODI0NzExMTgz.-BAB_T5U2visgIrTgfUHr5ZmjmMir7QOlCaALeUwC0Qg.Y379lktUyZ-DRo-2fj1QZITB620s-eMyTC4yz7e-KuAg.JPEG/a_32f98dda886343ceaedb9a4390b3cc14.jpg?type=m_2560"
          className="w-full"
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
          src="https://kream-phinf.pstatic.net/MjAyMjEyMTJfMTg4/MDAxNjcwODIyMTk1MDM5.Sp_hZUMfsJHIT5qZWeL-sga89sl-e6dJBk8j1ni5z5og.DiT2CvPT1ckDsjnqAMgmJTg4yFdHXQMIl3PabkTvrwQg.JPEG/a_d736784fe3d44e4a978d516266078556.jpg?type=m_2560"
          className="w-full"
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
