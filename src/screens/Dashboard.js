import React, { Component } from 'react'
import { getAllAds, searchProductByText } from '../config/firebase';
// import FbImageLibrary from 'react-fb-image-grid';
import Moment from 'react-moment';
// import { Subject } from 'rxjs';
import {
  Container, Row, Col,
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button
} from 'reactstrap';
import AdsAddModal from '../components/adsAddModal';

export default class Dashboard extends Component {
  // startAt = new Subject();
  // endAt = new Subject();
  constructor(props) {
    super(props);
    this.state = {
      ads: []
    }
    this.onAdsTextChangeHandler = this.onAdsTextChangeHandler.bind(this);
    this.addAds = this.addAds.bind(this);
  }

  componentDidMount() {
    getAllAds()
      .then(data => {
        console.log('data ads', data);
        this.setState({ ads: data });
      }).catch(err => {
        console.log('err in ads', err)
      })
  }

  onAdsTextChangeHandler(e) {
    searchProductByText(e.target.value)
      .then((querySnapshot) => {
          console.log('querySnapshot', " => ", querySnapshot);
          this.setState({ads: querySnapshot});
      });

  }

  addAds(){
    this.refs.adsChild.toggleAdsAdd();
  }

  render() {
    const { ads } = this.state;
    return (
      <div>
        <h3>Top picks for you </h3>
        <AdsAddModal ref="adsChild" adsAddModal={this.addAds}/>
        <Row>
          <Col sm="4"></Col>
          <Col sm="4">
            Search Product<input placeholder="search here" onChange={this.onAdsTextChangeHandler} />
          </Col>
          <Col sm="4">
            <Button color="primary" onClick={this.addAds}>Add your ad</Button>
          </Col>
        </Row>

        {
          ads.map(ad => {
            return (
              <Row className="justify-content-center">
                <Col sm="4" md="3" lg="3" xl="3">
                  <Card>
                    {/* <CardImg top width="100%" src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" alt="Card image cap" /> */}
                    {/* <FbImageLibrary width="auto" images={ad.images}/> */}

                    <CardImg src={ad.images[0]} />
                    <CardBody>
                      <CardTitle>{ad.title}</CardTitle>
                      <CardText>{ad.description}</CardText>
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
      </div>
    )
  }
}
