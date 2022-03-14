export const blocks = `
Hello, World

::: scale:2
Hello, World Larger
:::
`;

export const content = `
# Hello, World!
We can write _emphasized_ and **strong** text

<span>Here</span> is some mention text[^myReference]

# Trustpilot
<div class="trustpilot-widget" data-businessunit-id="5fc0711c5c55e80001f365ce" data-locale="en-GB" data-style-height="20px" data-style-width="100%" data-template-id="5419b6ffb0d04a076446a9af" data-theme="light"><a href="https://uk.trustpilot.com/review/onebigswitch.com.au" rel="noopener" target="_blank">Trustpilot</a></div>

## Alignment
<- i am _left_ aligned <-
-> i am **right** aligned ->
-> i am centered <-

## Here is a [link](https://example.com)

Links inside markdown can still provide a tracking action.
To do this you neeed to add a pipe after the text you want to display

So for a link that says 'Click', you'd write 'Click|get_started' in the
body of the link bracket: [Click|get_started](https://example.com)

or you can have the link open in a new tab by adding a target attribute after the tracking action's pipe like 'Click|get_started|{"target": "_blank"}': [Click|get_started|{"target": "_blank"}](https://example.com)

or add some data attributes 'Click||{"style": {"color": "red", "textDecoration": "none"}, "data-test": "sample", "data-sample": "sample2"}': [Click222||{"style": {"color": "red", "textDecoration": "none"}, "data-test": "sample", "data-sample": "sample2"}](https://example.com)

If there is an empty value after the pipe - it still works: [Click|](https://example.com)

Here is a [link]({{sample.url}})

**Notes:**
- Format should be 'TEXT|TRACKING_ACTION|ADDITIONAL_ATTRIBUTES'.
- The ADDITIONAL_ATTRIBUTES should be an object and double quoted keys/values

## Scale
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
