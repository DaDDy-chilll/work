/* eslint-disable react/prop-types */
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import {
  Box,
  CircularProgress,
  FormControlLabel,
  IconButton,
  Radio,
  RadioGroup,
  Typography,
} from '@mui/material';
import WorkflowRoute from '../ui/WorkflowRoute';
import { colors } from '../../assets/theme/theme';
import EmptyWorkflowImg from '../../assets/images/Empty_Workflow.svg';
import { useSelectWorkflow } from '../../hooks/useSelectWorkflow';

const EmptyWorkflowResult = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        m: 5,
        gap: 2,
        height: '50vh',
      }}
    >
      <img src={EmptyWorkflowImg} style={{ height: '100%' }} />
      <Typography>
        No Work Flow available . Please add from All Work Flow into My Work
        Flow.
      </Typography>
    </Box>
  );
};

const WorkflowRow = ({ item, index, favouriteWorkflowIds, saveWorkflow }) => {
  return (
    <>
      <FormControlLabel
        value={item._id}
        control={<Radio />}
        label={
          <WorkflowRoute name={item?.name} departments={item?.departments} />
        }
        sx={{
          '& .MuiSvgIcon-root': {
            fontSize: 20,
          },
        }}
      />
      {index === 1 && (
        <IconButton sx={{ mr: 2 }} onClick={() => saveWorkflow(item._id)}>
          {favouriteWorkflowIds.includes(item._id) ? (
            <Favorite sx={{ fontSize: '20px', color: colors.paleBlue[800] }} />
          ) : (
            <FavoriteBorder
              sx={{ fontSize: '20px', color: colors.paleBlue[800] }}
            />
          )}
        </IconButton>
      )}
    </>
  );
};

const SelectWorkflowBody = ({
  index,
  name,
  formProps: { values, handleChange },
}) => {
  const { workflows, favouriteWorkflowIds, saveWorkflow, error, isError } =
    useSelectWorkflow(index);

  if (isError) return <p>Error: {error?.response?.data?.message}</p>;

  return (
    <RadioGroup name={name} value={values[name]} onChange={handleChange}>
      {workflows ? (
        workflows.length === 0 ? (
          <EmptyWorkflowResult />
        ) : (
          workflows?.map((item) => (
            <Box
              key={item._id}
              sx={{
                borderBottom: `1px solid ${colors.grey[400]}`,
                py: 1,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <WorkflowRow
                item={item}
                favouriteWorkflowIds={favouriteWorkflowIds}
                index={index}
                saveWorkflow={saveWorkflow}
              />
            </Box>
          ))
        )
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      )}
    </RadioGroup>
  );
};

export default SelectWorkflowBody;
