import React from 'react';
import { Header } from '../src';
import { headerTags, weightProps, fontStyles } from '../src/text';

// eslint-disable-next-line import/prefer-default-export
export function GeneratedStyles() {
  return headerTags.map(tag =>
    fontStyles.map(fontStyle =>
      weightProps.map(weight => (
        <div
          key={`${tag}-${fontStyle}-${weight}`}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <Header weight={weight} font={fontStyle} tag={tag}>
            Hello, World
          </Header>
          <small
            style={{ fontSize: '12px', color: '#b3b3b3', paddingLeft: '20px' }}
          >
            {`${tag} | ${weight} | ${fontStyle}`}
          </small>
        </div>
      ))
    )
  );
}
