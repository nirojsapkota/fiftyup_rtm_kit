import React from 'react';
import axios from 'axios';
// eslint-disable-next-line import/named
import {
  render,
  // eslint-disable-next-line import/named
  fireEvent,
  // eslint-disable-next-line import/named
  wait,
  // eslint-disable-next-line import/named
  cleanup,
} from '../../../bootstrap/setup/testSetup';
import LoginForm from '../LoginForm';
import loginPanelProps from '../__fixtures__/loginPanel';
import loginMock from '../__fixtures__/loginMock';

jest.mock('axios');

// automatically unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

const mockDefaultAxios = () => {
  axios.get.mockResolvedValue({ data: [] });
  axios.post.mockResolvedValue({ data: { redirectPath: '/' } });
};

describe('<LoginForm />', () => {
  it('submit button will be disable when clicked', async () => {
    // set Up
    mockDefaultAxios();

    const { getByText, getByPlaceholderText } = render(
      <LoginForm {...loginPanelProps} />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    // expect submit button was disable
    await wait(() => {
      expect(submit).toBeDisabled();
    });
  });

  it('handleSuccess func prop was fired after click submit', async () => {
    // set Up
    mockDefaultAxios();

    const handleSuccess = jest.fn();

    const { getByText, getByPlaceholderText } = render(
      <LoginForm {...loginPanelProps} handleSuccess={handleSuccess} />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    // expect props event was fired
    await wait(() => {
      expect(handleSuccess).toHaveBeenCalled();
    });
  });

  it('login request as epected url and param', async () => {
    // set Up
    mockDefaultAxios();

    const { getByText, getByPlaceholderText } = render(
      <LoginForm {...loginPanelProps} />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    expect(axios.post).toHaveBeenCalledTimes(2);
    expect(axios.post).toHaveBeenCalledWith(
      loginPanelProps.loginUrl,
      {
        ...loginPanelProps.hiddenFields,
        user: {
          email: 'user@example.com',
          postcode_suburb: '2000, Barangaroo',
        },
      },
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'X-CSRF-Token': loginPanelProps.authenticityToken,
        },
      }
    );
  });

  it("doesn't not allow empty email", async () => {
    // set Up
    mockDefaultAxios();

    const { container, getByText, getByPlaceholderText } = render(
      <LoginForm {...loginPanelProps} />
    );

    // grab the form node
    const form = container.querySelector('form');

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: '' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
      // expect form can't submit
      expect(form.checkValidity()).toBeFalsy();
    });
  });

  it("doesn't not allow empty postcode", async () => {
    // set Up
    mockDefaultAxios();

    const { container, getByText, getByPlaceholderText } = render(
      <LoginForm {...loginPanelProps} />
    );

    // grab the form node
    const form = container.querySelector('form');

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'user@example.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
      // expect form can't submit
      expect(form.checkValidity()).toBeFalsy();
    });
  });

  it("doesn't not allow invalid email", async () => {
    // set Up
    mockDefaultAxios();

    const { container, getByText, getByPlaceholderText } = render(
      <LoginForm {...loginPanelProps} />
    );

    // grab the form node
    const form = container.querySelector('form');

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'invalid email' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
      // expect form can't submit
      expect(form.checkValidity()).toBeFalsy();
    });
  });

  it('Get internal errors from server when submit login', async () => {
    // setup
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockRejectedValue({
      response: {
        status: 500,
        data: { errors: ['Random error'] },
      },
    });

    const { getByText, getByPlaceholderText, container } = render(
      <LoginForm {...loginPanelProps} />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test@gmail.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
      expect(container).toHaveTextContent(
        'An error has occurred, please try again in a few minutes'
      );
    });
  });

  it('Get unauthorize errors from server when submit login', async () => {
    // setup
    axios.get.mockResolvedValue({ data: [] });
    axios.post.mockRejectedValue({
      response: {
        status: 401,
        data: { errors: ['Email is not valid'] },
      },
    });

    const { getByText, getByPlaceholderText, container } = render(
      <LoginForm {...loginPanelProps} />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test@gmail.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
      expect(container).toHaveTextContent('Email is not valid');
    });
  });

  it('response signin failed by pass custom handle func', async () => {
    // setup
    axios.get.mockResolvedValue({ data: [] });

    const { getByText, getByPlaceholderText, container } = render(
      <LoginForm
        {...loginPanelProps}
        handleSubmit={loginMock(400, { data: { errors: ['Sign in failed'] } })}
      />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test@gmail.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
      expect(container).toHaveTextContent('Sign in failed');
    });
  });

  it('response unexpected error by pass custom handle func', async () => {
    // setup
    axios.get.mockResolvedValue({ data: [] });

    const { getByText, getByPlaceholderText, container } = render(
      <LoginForm
        {...loginPanelProps}
        handleSubmit={loginMock(500, {
          data: { errors: ['Something went wrong'] },
        })}
      />
    );

    const email = getByPlaceholderText('Email');
    fireEvent.change(email, {
      target: { value: 'test@gmail.com' },
    });
    const postcode = getByPlaceholderText('Postcode');
    fireEvent.change(postcode, {
      target: { value: '2000, Barangaroo' },
    });

    const submit = getByText(loginPanelProps.buttonText);
    fireEvent.click(submit);

    await wait(() => {
      expect(submit).not.toBeDisabled();
      expect(container).toHaveTextContent('Something went wrong');
    });
  });

  describe('Post code field events', () => {
    it('Auto complete not run when input postcode length < 1', async () => {
      // setup
      const data = ['5000, ADELAIDE', '5000, ADELAIDE BC'];
      axios.get.mockResolvedValue({
        data,
      });
      const { getByPlaceholderText, container } = render(
        <LoginForm {...loginPanelProps} />
      );
      const postcode = getByPlaceholderText('Postcode');
      fireEvent.change(postcode, { target: { value: '5' } });
      fireEvent.click(postcode);
      await wait(() => {
        expect(container).not.toHaveTextContent(data[0]);
        expect(container).not.toHaveTextContent(data[1]);
      });
    });

    it('Auto complete run when input postcode', async () => {
      // setup
      const data = ['5000, ADELAIDE', '5000, ADELAIDE BC'];
      axios.get.mockResolvedValue({
        data,
      });
      const { getByPlaceholderText, container } = render(
        <LoginForm {...loginPanelProps} />
      );
      const postcode = getByPlaceholderText('Postcode');
      fireEvent.change(postcode, { target: { value: '5000' } });
      fireEvent.click(postcode);
      expect(axios.get).toHaveBeenCalledWith(
        loginPanelProps.autocompletePostcodeUrl,
        {
          headers: {
            Accept: 'application/json',
            'X-CSRF-Token': loginPanelProps.authenticityToken,
          },
          params: { term: '5000' },
        }
      );
      await wait(() => {
        expect(container).toHaveTextContent(data[0]);
        expect(container).toHaveTextContent(data[1]);
      });
    });

    it('Input change when select value in autocomplete', async () => {
      // setup
      const data = ['5000, ADELAIDE', '5000, ADELAIDE BC'];
      axios.get.mockResolvedValue({
        data,
      });
      const { getByText, getByPlaceholderText, container } = render(
        <LoginForm {...loginPanelProps} />
      );
      const postcode = getByPlaceholderText('Postcode');
      fireEvent.change(postcode, {
        target: { value: '5000' },
      });
      fireEvent.click(postcode);
      await wait(() => {
        expect(container).toHaveTextContent(data[0]);
        expect(container).toHaveTextContent(data[1]);
        const selected = getByText(data[0]);
        fireEvent.click(selected);
        expect(postcode.value).toEqual(data[0]);
      });
    });

    it('Error when get value in autocomplete', async () => {
      // setup
      axios.get.mockRejectedValue({
        response: {
          status: 500,
          data: { errors: ['error'] },
        },
      });
      const { getByPlaceholderText, container } = render(
        <LoginForm {...loginPanelProps} />
      );
      const postcode = getByPlaceholderText('Postcode');
      fireEvent.change(postcode, {
        target: { value: '5000' },
      });
      fireEvent.click(postcode);
      await wait(() => {
        expect(container).not.toHaveTextContent('5000, ADELAIDE');
      });
    });
  });

  describe('When <LoginForm /> enable Gdpr agreement.', () => {
    it(`Render gdpr agreement with checkbox confirm`, () => {
      const { getByTestId, getByText, container } = render(
        <LoginForm {...loginPanelProps} />
      );
      const chkbAgreement = getByTestId('ckAgreement');

      expect(
        getByText('By ticking this box, you agree to our')
      ).toBeInTheDocument();
      expect(chkbAgreement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });

    it(`Render gdpr agreement message does NOT show checkbox`, () => {
      const gdprProps = { ...loginPanelProps.gdprProps, enableCheckBox: false };

      const { queryByTestId, getByText } = render(
        <LoginForm {...loginPanelProps} gdprProps={gdprProps} />
      );
      const chkbAgreement = queryByTestId('ckAgreement');

      expect(
        getByText('By clicking the button above, you agree to our')
      ).toBeInTheDocument();
      expect(chkbAgreement).not.toBeInTheDocument();
    });

    it('Form does NOT allow submit when agreement checkbox un-checked', async () => {
      const gdprProps = { ...loginPanelProps.gdprProps, enableCheckBox: true };
      const { container, getByText, getByPlaceholderText } = render(
        <LoginForm {...loginPanelProps} gdprProps={gdprProps} />
      );
      const email = getByPlaceholderText('Email');
      const postcode = getByPlaceholderText('Postcode');
      const form = container.querySelector('form');
      const submit = getByText(loginPanelProps.buttonText);

      fireEvent.change(email, {
        target: { value: 'user@example.com' },
      });
      fireEvent.change(postcode, {
        target: { value: '5000' },
      });
      fireEvent.click(submit);

      await wait(() => {
        // check it directly
        expect(form.checkValidity()).toBeFalsy();
      });
    });

    it('Form allow submit when agreement checkbox checked', async () => {
      const gdprProps = { ...loginPanelProps.gdprProps, enableCheckBox: true };
      const {
        container,
        getByText,
        getByPlaceholderText,
        getByTestId,
      } = render(<LoginForm {...loginPanelProps} gdprProps={gdprProps} />);
      const form = container.querySelector('form');
      const email = getByPlaceholderText('Email');
      fireEvent.change(email, {
        target: { value: 'user@example.com' },
      });
      const postcode = getByPlaceholderText('Postcode');
      fireEvent.change(postcode, {
        target: { value: '5000' },
      });
      const submit = getByText(loginPanelProps.buttonText);
      const chkbAgreement = getByTestId('ckAgreement');

      fireEvent.click(submit);
      fireEvent.click(chkbAgreement);

      await wait(() => {
        // check it directly
        expect(form.checkValidity()).toBeTruthy();
      });
      expect(container).not.toHaveTextContent('Login was unsuccessful.');
    });
  });
});
