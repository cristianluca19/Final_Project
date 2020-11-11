import PropTypes from 'prop-types';
import { Container, Typography, Grid, makeStyles } from "@material-ui/core";
import CandidateCard from '../CandidateCard';


const useStyles = makeStyles((theme) => ({
    container: {
        paddingTop: "2rem",
    },
    paddingCandidate : {
        paddingTop: 10,
    },
    CandidateCard: {
        margin: 25,
        borderRadious: 10,
    }
}))

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
                {props.users.map((candidate) => (
                    <div className={classes.CandidateCard}><CandidateCard/></div>
                ))} 
            </Grid>
        </Container>
    )
}

CardsContainer.propTypes = {
    users: PropTypes.array,
  }

CardsContainer.defaultProps = {
    users: [{},{},{},{},{},{},{},{},{},{}]
}

export default CardsContainer;