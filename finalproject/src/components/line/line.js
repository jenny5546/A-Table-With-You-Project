import React from 'react';

import { Box } from 'rebass';

const Line = () => {
  return (
    <Box
      width="100%"
      height="2px"
      sx={{
        borderTop: '2px solid #ccc',
        marginTop: '10px',
      }}
    />
  );
};

export default Line;
