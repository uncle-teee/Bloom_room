import { Link } from "react-router-dom"

const Carousel = () => {
  return(
    <div>
       <section className="row">
            <div className="col-md-12">
                <div className="carousel slide" id="mycarousel" data-bs-ride="carousel">
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <img src="images/background.PNG" alt="" className="d-block w-100" height="600px" width="200px"/>
                        </div>

                        <div className="carousel-item">
                            <img src="images/background3.JPG" alt="" className="d-block w-100" height="600px" width="200px"/>
                        </div>                        
                    </div>

                    <Link to="#mycarouse0" className="carousel-control-prev" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"></span>
                    </Link>
                    <Link to="#mycarousel" className="carousel-control-next" data-bs-slide="next">
                        <span className="carousel-control-next-icon"></span>
                    </Link>

                    <ul className="carousel-indicators ">
                        <li data-bs-slide-to="0" data-bs-target="#mycarousel" className="active"></li>
                        <li data-bs-slide-to="1" data-bs-target="#mycarousel" className="active"></li>
                    </ul>
                </div>
            </div>
         </section> 
    </div>
  )
}

export default Carousel;