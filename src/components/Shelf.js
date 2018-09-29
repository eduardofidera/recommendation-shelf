import React, { Component } from 'react'
import Slider from "react-slick";


export default class Shelf extends Component {
  state = {
    recommendations: undefined
  }
  componentWillMount() {
    (async() => {
      const rawResponse = await fetch ('https://api.smartsales.shop/v1/asl/pub/recommendation_shelf/basic?cookie_id=rjNI31538180667&email=&limit=12',
        {
          headers: {
            tenant: 'qix'
          }
        }
      )

      const recommendations = await rawResponse.json()

      this.setState({
        recommendations
      })
    })()
  }

  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    }

    return (
      <Slider className="slick" {...settings}>
        {this.state.recommendations && this.state.recommendations.map((recommendation) => (
          <div className="slick__item" key={recommendation.productId}>
            <img src={recommendation.skus[0].images[0].imageUrl} />
            {recommendation.name}
          </div>
        ))}
      </Slider>
    )
  }
}