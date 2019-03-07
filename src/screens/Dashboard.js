import React, { Component } from 'react'
import { getAllAds, searchProductByText } from '../config/firebase';
import Loader from 'react-loader-spinner';
import RangeSlider from 'reactrangeslider';

// import FbImageLibrary from 'react-fb-image-grid';
import Moment from 'react-moment';
// import { Subject } from 'rxjs';
import {
  Row, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, Button
} from 'reactstrap';
import AdsAddModal from '../components/adsAddModal';


// const MyPage = (value, onChange) => {
//   return (
//     <div>
//       <RangeSlider
//         value={value}
//         onChange={onChange}
//         min={20}
//         max={100}
//         step={5}
//       />
//     </div>
//   )
// }

export default class Dashboard extends Component {
  // startAt = new Subject();
  // endAt = new Subject();
 
  // value = { start: 100, end: 10000000 }
  constructor(props) {
    super(props);
    this.state = {
      ads: [],
      isLoading: false,
      // value: {
      //   start: 100,
      //   end: 10000000,
      // },
    }
    this.onAdsTextChangeHandler = this.onAdsTextChangeHandler.bind(this);
    this.onChangeSlider = this.onChangeSlider.bind(this);
    this.addAds = this.addAds.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });
    getAllAds()
      .then(data => {
        console.log('data ads', data);
        this.setState({ ads: data });
        this.setState({ isLoading: false });

      }).catch(err => {
        this.setState({ isLoading: false });
        console.log('err in ads', err)
      })
  }

  onAdsTextChangeHandler(e) {
    this.setState({ isLoading: true });
    searchProductByText(e.target.value)
      .then((querySnapshot) => {
        console.log('querySnapshot', " => ", querySnapshot);
        this.setState({ ads: querySnapshot });
        this.setState({ isLoading: false });
      });

  }

  addAds() {
    this.refs.adsChild.toggleAdsAdd();
  }

  onChangeSlider(value) {
    console.log(value);
    this.setState({ value })
  }

  render() {
    const { ads, value } = this.state;

    console.log('value', value)

    return (
      <div>
        <h3>`Top picks for you` </h3>
        {/* <MyPage
          value='jhk'
          onChange={this.onChangeSlider}
        /> */}


        <AdsAddModal ref="adsChild" adsAddModal={this.addAds} />
        <Row style={{ 'marginBottom': '15px' }}>
          <Col sm="4"></Col>
          <Col sm="4">
            <p style={{ 'marginBottom': '15px', fontWeight: 'bold' }}>Search Product</p><input placeholder="search here" onChange={this.onAdsTextChangeHandler} />
          </Col>
          <Col sm="4" style={{ 'marginBottom': '15px' }}>
            <Button style={{ 'marginTop': '15px' }} color="primary" onClick={this.addAds}>Add your ad</Button>
          </Col>
        </Row>
        {this.state.isLoading && <Loader
          type="Circles"
          color="#FFB606"
          height="100"
          width="100" />}

        {
          ads.map(ad => {
            return (
              <Row className="justify-content-center">
                <Col sm="4" md="3" lg="3" xl="3">
                  <Card style={{ marginBottom: '2.5rem', boxShadow: '1px 4px 5px lightslategrey' }}>
                    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                    {/* <FbImageLibrary width="auto" images={ad.images}/> */}

                    <CardImg src={ad.images[0]} />
                    <CardBody>
                      <CardTitle>{ad.title}</CardTitle>
                      <CardText>{ad.description}</CardText>
                      <CardText>{ad.price} Rs</CardText>
                      <CardText>
                        <small className="text-muted">Last updated <Moment fromNow>{ad.createdAt}</Moment></small>
                      </CardText>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )
          })
        }

        {!this.state.isLoading && !ads.length && <div>Not Found :-( </div>}
      </div>
    )
  }
}
