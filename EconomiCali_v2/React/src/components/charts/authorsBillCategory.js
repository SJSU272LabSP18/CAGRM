import React, {Component} from 'react';
import {connect} from "react-redux";
import * as API from "./../../api/API";
import {withRouter} from "react-router-dom";
const ReactHighcharts = require('react-highcharts');

class AuthorByCategoty extends Component {

    // static propTypes = {
    //     handleSubmit: PropTypes.func.isRequired
    // };
    constructor(props) {
        super(props);
        this.state = {
            userId: '',
            view:"projects",
            config:{
                chart: {
                    type: 'column'
                },
                /* HighchartsConfig */
                xAxis: {
                    categories: []
                },
                series: [{
                    name: 'Tokyo',
                    data: []

                }]
            }
        }
    }


    componentDidMount(){
        var self = this;
        var payload ={categorydata : "Health-care"}
        API.fetchbills(payload)
            .then(
                (response) =>{
                    console.log(response.data);

                    var res = response.data.filter(function (el ) {
                        return "Health-care".indexOf(el._id.category) >= 0;
                    });
                    // filter by category
                    console.log(res);


                    var authors = [];
                    var counts= [];
                    res.slice(0, 5).map((data) => {
                        authors.push(data._id.author);
                        counts.push(data.count);
                    })

                    console.log("authors : " + authors );
                    console.log("counts : " + counts);

                    self.setState({
                        config:{
                            chart: {
                                type: 'column'
                            },
                            /* HighchartsConfig */
                            xAxis: {
                                categories: authors
                            },
                            series: [{
                                name: 'Tokyo',
                                data: counts

                            }]
                        },
                    })
                }
            );
    }


    render(){
        return(
            <div>
                <ReactHighcharts config = {this.state.config}/>
            </div>

        )
    }
}




export default withRouter(AuthorByCategoty);