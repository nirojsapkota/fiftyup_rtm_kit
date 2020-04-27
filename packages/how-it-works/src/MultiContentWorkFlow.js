/*
MultiContentWorkFlow component is the new version of "How it Works" component initially designed to use it inside the Landing Page"
*/

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Img } from '@rtm-ui/img';
import { Markdown } from '@rtm-ui/typography';
import { Box } from '@rtm-ui/layout';
import { VideoDialog } from '@rtm-ui/video-dialog';

const HeaderMarkdown = styled(Markdown)`
  text-align: center;
`

const ContentMarkdown = styled(Markdown)`
  text-align: center;
`
const ComponentSwitchContainer = styled.div`
  margin: 20px auto;
  width: 100%;
`

const ComponentSwitcher = ({item}) => {
  return (
    <ComponentSwitchContainer>
      { item.type === 'image' && <Img src={item.src} alt={item.content} /> }
      { item.type === 'video' && (
        <Box m="auto" px={[2, 2, 3]}>
          <VideoDialog
            containerStyle={{position: 'relative', paddingTop: '50%'}}
            iframeStyle={{position: 'absolute', top: 0, left: 0}}
            videoSrc={item.src}
            description={item.content} />
        </Box>
      )}
      { item.type === 'markdown' && <ContentMarkdown px={[3, 3, 4]} raw={item.content} /> }
    </ComponentSwitchContainer>
  )
}

export const MultiContentWorkFlow = ({ header, items }) => {
  return (
    <Box>
      <HeaderMarkdown px={[3, 3, 4]} raw={header} />
      { items && items.map((s, index) => {
          return(<ComponentSwitcher key={index} item={s}/>)
        }) }
    </Box>
  );
};

MultiContentWorkFlow.propTypes = {
  header: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      content: PropTypes.string,
    })
  ),
};
