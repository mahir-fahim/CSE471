

import React from 'react';
import WorkoutNoteForm from '../components/WorkoutNoteForm';

const WorkoutDetail = ({ userId, workoutId }) => {
  return (
    <div>
      {/* Your existing workout details */}
      <WorkoutNoteForm userId={userId} workoutId={workoutId} />
    </div>
  );
};

export default WorkoutDetail;
