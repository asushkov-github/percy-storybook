import getStories from '../getStories';
import { storiesKey } from '../constants';

it('raises an error when called with an empty object', async () => {
  try {
    await getStories();
  } catch (e) {
    expect(e).toEqual(new Error('Storybook code was not received.'));
  }

  expect.assertions(1);
});

it('returns an empty array when no stories loaded', async () => {
  const code = '<html></html>';

  try {
    await getStories(code);
  } catch (e) {
    const message =
      'Storybook object not found on window. ' +
      "Check your call to serializeStories in your Storybook's config.js.";
    expect(e).toEqual(new Error(message));
  }

  expect.assertions(1);
});

it('returns the value window[storiesKey] is set to', async () => {
  const code = `if (typeof window === 'object') window['${storiesKey}'] = 'hi';`;

  const stories = await getStories(code);
  expect(stories).toEqual('hi');
});
