import PropTypes from 'prop-types';
import { Container, Grid } from "@material-ui/core";
import CandidateCard from '../CandidateCard';
import { useStyles } from './styles.js';


function CardsContainer (props) {

    
    const classes = useStyles();

    return (                                            
        <Container className={classes.container} maxWidth="xl">
            <Grid className={classes.paddingCandidates}
                container
                direction="row"
                justify="center"
                alignItems="center"
                >
                {props.users.map((candidate,index) => (
                    <div key={index} className={classes.CandidateCard}><CandidateCard/></div>
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