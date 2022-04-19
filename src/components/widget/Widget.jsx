import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';
import { AccountBalanceWallet, KeyboardArrowDown, LibraryBooks, People, Person } from '@mui/icons-material';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import PropTypes from 'prop-types';

export const Widget = ({ type, counter }) => {
  const data = {
    student: {
      title: 'STUDENTS',
      counter: 100,
      percent: -10,
      icon: (
        <People
          className="icon"
          style={{
            color: 'crimson',
            height: 30,
            width: 30,
          }}
        />
      ),
    },
    course: {
      title: 'COURSES',
      counter: 20,
      percent: 30,
      icon: (
        <LibraryBooks
          className="icon"
          style={{
            color: '#303f9f',
            height: 30,
            width: 30,
          }}
        />
      ),
    },
    earning: {
      title: 'EARNINGS',
      counter: 15000,
      percent: -20,
      icon: (
        <AccountBalanceWallet
          className="icon"
          style={{
            color: 'green',
            height: 30,
            width: 30,
          }}
        />
      ),
    },
    teacher: {
      title: 'TEACHERS',
      counter: 50,
      percent: 10,
      icon: (
        <Person
          className="icon"
          style={{
            color: '#4A0D67',
            height: 30,
            width: 30,
          }}
        />
      ),
    },
  };
  if (counter) {
    data[type].counter = counter;
  }

  return (
    <Card
      sx={{
        width: '100%',
        padding: '10px',
        boxShadow: '2px 4px 10px 1px rgba(201, 201, 201, 0.47)',
      }}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'space-between',
          }}
        >
          <Grid item>
            <Typography color="textSecondary" gutterBottom variant="overline">
              {data[type].title}
            </Typography>
            <Typography color="textPrimary" variant="h4">
              {data[type].counter}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: '#f8f9fa',
                height: 70,
                width: 70,
              }}
            >
              {data[type].icon}
            </Avatar>
          </Grid>
        </Grid>
        <Box
          sx={{
            pt: 3,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {data[type].percent < 0 ? (
            <>
              <KeyboardArrowDown color="error" />
              <Typography
                color="error"
                sx={{
                  mr: 1,
                }}
                variant="body2"
              >
                {data[type].percent}%
              </Typography>
            </>
          ) : (
            <>
              <KeyboardArrowUp color="success" />
              <Typography
                color="success.main"
                sx={{
                  mr: 1,
                }}
                variant="body2"
              >
                {data[type].percent}%
              </Typography>
            </>
          )}

          <Typography color="textSecondary" variant="caption">
            Since last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

Widget.propTypes = {
  type: PropTypes.string,
  counter: PropTypes.number,
};
