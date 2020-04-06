import React from 'react';
// eslint-disable-next-line
import { render, fireEvent, wait } from '../../../bootstrap/setup/testSetup';
import { Nav } from '../index';
import { Button } from '@rtm-ui/button';

const setup = async props => {
  return render(
    <>
      <Nav
        logo="fiftyup"
        subHeader="Australia's top money-saving destination"
        tagline="1,000,000 Members"
        items={[
          {
            id: 'how-it-works',
            onClick: props && props.onClick,
            label: 'How it works',
            navbar: true,
          },
          {
            id: 'scroll-me',
            scrollTo: 'scrollsToElement',
            label: 'Scroll me',
            navbar: true,
          },
          {
            id: 'news',
            href: '/news',
            label: 'News',
            navbar: true,
          },
          {
            id: 'about-us',
            href: '/about',
            label: 'About Us',
          }
        ]}
        {...props}
      >
        <Button>join for free</Button>
      </Nav>
      <div scroll-target='scrollsToElement' />
    </>
  );
};

describe(`<Nav />`, () => {
  describe(`when the toggle button is clicked`, () => {
    it(`it shows the popout panel and covers the rest of the screen`, async () => {
      const { getByText, getByTestId } = await setup();
      const toggle = getByTestId('toggle-nav');
      fireEvent.click(toggle);

      await wait(() => {
        const item = getByText(/news/i);
        expect(item).toBeInTheDocument();
      });
    });
    describe(`to close the popout`, () => {
      it(`clicking the close button works`, async () => {
        const { getByText, getByTestId } = await setup();
        const toggle = getByTestId('toggle-nav');
        fireEvent.click(toggle);

        await wait(() => {
          const item = getByText(/news/i);
          expect(item).toBeInTheDocument();
          const toggleClose = getByTestId('toggle-close-nav');
          fireEvent.click(toggleClose);
          expect(item).not.toBeInTheDocument();
        });
      });
      it.skip(`clicking outside the popout works`, async () => {
        const { getByText, getByTestId } = await setup();
        const toggle = getByTestId('toggle-nav');
        fireEvent.click(toggle);

        await wait(() => {
          const item = getByText(/news/i);
          expect(item).toBeInTheDocument();
          const toggleClose = getByTestId('nav-screen');
          fireEvent.click(toggleClose);
          expect(item).not.toBeInTheDocument();
        });
      });
    });
  });
  describe(`when a user is passed to the component`, () => {
    it(`it shows the user's emaill with a sign out button in the popout panel`, async () => {
      const { getByText, getByTestId } = await setup({
        user: { email: 'user@example.com' },
        signOutPath: '/some-path',
        signInPath: '/some-other-path',
      });
      const toggle = getByTestId('toggle-nav');
      fireEvent.click(toggle);

      await wait(() => {
        expect(getByText('user@example.com')).toBeInTheDocument();
      });
    });
  });
  describe(`when no user is passed to the component`, () => {
    it(`shows a sign up button on the navbar`, async () => {
      const { getByText } = await setup({
        signOutPath: '/some-path',
        signInPath: '/some-other-path',
      });

      await wait(() => {
        expect(getByText(/join for free/i)).toBeInTheDocument();
      });
    });
    it(`shows a sign up button in the popout panel`, async () => {
      const { getByText, getByTestId } = await setup({
        signOutPath: '/some-path',
        signInPath: '/some-other-path',
      });
      const toggle = getByTestId('toggle-nav');
      fireEvent.click(toggle);

      await wait(() => {
        expect(getByText(/sign up/i)).toBeInTheDocument();
      });
    });
  });
  describe(`for mobile views`, () => {
    window.innerWidth = 500;
    it(`doesn't show the tagline or navbar menu items`, async () => {
      const { queryByText } = await setup();
      await wait(() => {
        expect(queryByText('1,000,000 Members')).not.toBeInTheDocument();
      });
    });
  });
  describe(`for desktop views`, () => {
    it(`clicking the nav onClick`, async () => {
      window.innerWidth = 1301;
      const mockOnClick = jest.fn();
      const { getByText } = await setup({
        onClick: mockOnClick,
      });
      const navItem = getByText('How it works');
      fireEvent.click(navItem);

      await wait(() => {
        expect(mockOnClick).toHaveBeenCalled();
      });
    });
    it(`shows the tagline and menu items where 'navbar' is true`, async () => {
      window.innerWidth = 1301;
      const { getByText, debug, queryByText } = await setup();

      await wait(() => {
        expect(getByText('1,000,000 Members')).toBeInTheDocument();
        expect(getByText(/news/i)).toBeInTheDocument();
        expect(queryByText(/about us/i)).not.toBeInTheDocument();
      });
    });
    it(`it shows the popout panel with hidden items`, async () => {
      window.innerWidth = 1301;
      const { getByText, getByTestId } = await setup();
      const toggle = getByTestId('toggle-nav');
      fireEvent.click(toggle);

      await wait(() => {
        const item = getByText(/about us/i);
        expect(item).toBeInTheDocument();
      });
    });
    describe(`for links that scrolls to element`, () => {
      it(`works`, async () => {
        window.scrollTo = jest.fn();
        const spy = jest.spyOn(window, 'scrollTo');
        const { getByText } = await setup();
        const navItem = getByText("Scroll me");
        fireEvent.click(navItem);

        await wait(() => {
          expect(spy).toHaveBeenCalled();
        });
      })
    })
    describe(`when resized`, () => {
      it(`hides the tagline and menu items`, async () => {
        window.innerWidth = 1301;
        const { getByText, queryByText } = await setup();

        await wait(async () => {
          await expect(getByText('1,000,000 Members')).toBeInTheDocument();
          window.innerWidth = 1000;
          window.dispatchEvent(new Event('resize'));
          await wait(async () => {
            expect(queryByText('1,000,000 Members')).not.toBeInTheDocument();
          });
        });
      });
    });
  });
  describe(`given a sticky prop`, () => {
    it(`sticks the navbar to the top of the document`, async () => {
      window.innerWidth = 1301;
      const { getByTestId } = await setup({
        sticky: true
      });
      expect(getByTestId("nav-fixed")).toBeInTheDocument();
    })
  })
  describe(`for the subheader`, () => {
    it(`it's shown`, async () => {
      const { getByText } = await setup({
        subHeader: 'Hello',
      });

      await wait(() => {
        expect(getByText('Hello')).toBeInTheDocument();
      });
    });
  });
});
