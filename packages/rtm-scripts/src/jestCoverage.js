import React from 'react';

// TODO: Get this working
export function CoverageReport({ data }) {
  return data ? (
    // TODO: This should be a proper component from Docz
    // http://feedback.docz.site/roadmap/p/new-package-docz-ui
    <table className="css-xn07g5 emcesns1">
      <thead>
        <tr>
          <th align="left">File</th>
          <th align="left">% Statements</th>
          <th align="left">% Branch</th>
          <th align="left">% Functions</th>
          <th align="left">% Lines</th>
        </tr>
      </thead>
      <tbody>
        {Object.values(data).map((items, pathIndex) => (
          <tr>
            <td>
              {Object.keys(data)
                [pathIndex].split('/')
                .pop()}
            </td>
            {Object.keys(items).map((key, index) => (
              <td>{Object.values(items)[index].pct}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    'No coverage reporting'
  );
}

// TODO: return a wrapper around require that returns null instead of the file
// const require = require('require');
// export const requireIt = path => {
//   return require(path);
// };
