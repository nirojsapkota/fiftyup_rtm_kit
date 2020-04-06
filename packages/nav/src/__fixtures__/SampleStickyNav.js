/* istanbul ignore file */
// FIXME: This file is currently excluded in the
// coverage checks as this is intended for testing purposes

import React, { useState } from 'react';
import { Button } from '../../../button/src';
import { Nav } from '../index';

const SampleStickyNav = () => {
  const [sticky, setSticky] = useState(false);

  return(
    <>
      <Button secondary onClick={() => { setSticky(!sticky)}}>Toggle Sticky Navbar</Button>
      <br/>
      <br/>
      <Nav
        sticky={sticky}
        user={false}
        header={toggle => 'Hello'}
        onHomeClick={() => console.log("/")}
        subHeader="Australia's money-saving destination"
        tagline="Australia's money-saving destination"
        isClosed={true}
        logo="fiftyup"
        items={[
          {
            id: "news",
            href: '/',
            label: "News",
            navbar: true,
          }
        ]}
      >
        <Button>join for free</Button>
      </Nav>
    </>
  )
}

export { SampleStickyNav };
