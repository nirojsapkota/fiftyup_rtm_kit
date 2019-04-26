import React, { Component } from 'react';
import { Button } from '@rtm-ui/button';
import styled from 'styled-components';
import { Box } from '@rtm-ui/layout';
import { Icon } from '@rtm-ui/icon';
import { Header } from '@rtm-ui/typography';

const StyleBox = styled(Box)`
  display: flex;
  overflow-y: auto;
  overflow-x: auto;
  min-height: 0px;
  align-items: center;
  min-width: 800px;
  justify-content: space-between;
`;

const ReadFile = props => {
  const { useState, useEffect } = React;
  const [list, setList] = useState([]);

  React.useEffect(() => {
    props.readFile().then(response => {
      const data = response.data.files;
      setList(data);
    });
  }, []);

  const downloadLink = (response, file) => {
    const data = [response.data];
    const link = document.createElement('a');
    link.href = data;
    link.setAttribute('download', file);
    document.body.appendChild(link);
    link.click();
  };

  const onDownload = event => {
    const file = event.target.value;
    const path = '' + file;
    props.downloadFile(path).then(response => downloadLink(response, file));
  };

  return (
    <Box>
      <StyleBox pr={['45px']}>
        <Header tag="h6">ID</Header>
        <Header tag="h6">List of Files</Header>
        <Header tag="h6">Download</Header>
      </StyleBox>
      {list &&
        list.map((item, index) => (
          <StyleBox py={['5px', 10]} key={index}>
            <Box>{index + 1}</Box>
            <Box>{item.split('/')[1]}</Box>
            <Box>
              <Button value={item} onClick={onDownload} id={index}>
                <Icon size={40} inline glyph="check" /> Save Files
              </Button>
            </Box>
          </StyleBox>
        ))}
    </Box>
  );
};

export { ReadFile };
