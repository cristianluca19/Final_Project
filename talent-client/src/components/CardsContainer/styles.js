import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '2rem',
    minHeight: 748,
  },
  paddingCandidate: {
    paddingTop: 10,
  },
  CandidateCard: {
    margin: 25,
    borderRadious: 10,
  },
  candidatesNotFound: {
    padding: '180px 50px 487px',
    color: 'white',
  },
}));
