import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Seo = ({ meta, title, link }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <link rel="shortcut icon" href={link} />
      {meta &&
        meta.map((s, i) =>
          !s.name ? (
            <meta key={i} property={s.property} content={s.content} />
          ) : (
            <meta key={i} name={s.name} content={s.content} />
          )
        )}
    </Helmet>
  );
};

export { Seo };

Seo.propTypes = {
  meta: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      content: PropTypes.string,
      property: PropTypes.string,
    })
  ),
  title: PropTypes.string,
  link: PropTypes.string,
};
