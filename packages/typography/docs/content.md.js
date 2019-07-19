export const blocks = `
Hello, World

::: scale:2
Hello, World Larger
:::
`;

export const content = `
# Hello, World!

## Here is a [link](https://example.com)

<span>Here</span> is some mention text[^myReference]

Links inside markdown can still provide a tracking action.
To do this you neeed to add a pipe after the text you want to display

We can write _emphasized_ and **strong** text

So for a link that says 'Click', you'd write 'Click|get_started' in the
body of the link bracket: [Click|get_started](https://example.com)

If there is an empty value after the pipe - it still works: [Click|](https://example.com)

Here is a [link]({{sample.url}})

::: scale:1.5
And here is some scaled up text

And here we go again
Here is a [link]({{sample.url}})

What if we break it up

## With a header

But the real question is... does it work with everything?

* Like
* These lists?

Or perhaps...

## Ordered lists?
1. Yep
2. I think
3. It does

And lastly, does it work with custom link logic? [Hello](https://example.com)
:::
`;
