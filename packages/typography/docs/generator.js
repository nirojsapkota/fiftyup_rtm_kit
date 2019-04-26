import React from 'react';
import { Header, Small } from '../src';
import { headerTags, weightProps, fontStyles } from '../src/text';

export function GeneratedStyles() {
  return headerTags.map(tag =>
    fontStyles.map(fontStyle =>
      weightProps.map(weight => (
        <div key={`${tag}-${fontStyle}-${weight}`}>
          <Header weight={weight} font={fontStyle} tag={tag}>
            Hello, World
          </Header>
          <div>
            <Small>{`${tag} | ${weight} | ${fontStyle}`}</Small>
          </div>
        </div>
      ))
    )
  );
}
