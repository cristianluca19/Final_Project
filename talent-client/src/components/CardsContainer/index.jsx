import PropTypes from 'prop-types';
import { Container, Grid } from "@material-ui/core";
import CandidateCard from '../CandidateCard';
import { useStyles } from './styles.js';
import { useSelector } from 'react-redux';
import React, {useState, useEffect} from 'react';
import axios from 'axios';


function CardsContainer (props) {

    const classes = useStyles();
    const [cand,setCand] = useState([]);
    let cardsMaxLimit = 10;

    
    useEffect(()=>{
        axios.get('http://localhost:3001/api/candidates')
        .then((candidates) => {
            setCand(candidates.data)
          return
        })
    },[])


    return (                                            
        <Container className={classes.container} maxWidth="xl">
            <Grid className={classes.paddingCandidates}
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                {/* cand.map((candidate,index) */}
                {cand.map((candidate,index) => (
                    (index < cardsMaxLimit) &&
                    <div key={index} className={classes.CandidateCard}><CandidateCard user={candidate}/></div>
                ))} 
            </Grid>
        </Container>
    )
}

CardsContainer.propTypes = {
    users: PropTypes.array.isRequired,
  }

CardsContainer.defaultProps = {
    users: [{},{},{},{},{},{},{},{},{},{}]
}

export default CardsContainer;