const fs = require('fs');

const packages = fs.readdirSync('../');
packages
  .filter(pkg => pkg !== 'rtm-scripts' && pkg !== '.DS_Store')
  .map(pkg => {
    const packageJson = require(require.resolve(
      `../../../${pkg}/package.json`
    ));
    describe(packageJson.name, () => {
      it(`does not have a default export`, () => {});
      const packageExport = require(packageJson.name);
      const rtmRollup = packageJson.rtmRollup;
      if (rtmRollup) {
        it(`does not have a default export`, () => {
          expect(packageExport.default).toBeUndefined();
        });
        Object.keys(packageExport)
          .filter(exportedModule => exportedModule !== 'default')
          .map(exportedModule => {
            it(`lists ${exportedModule} as a named export`, () => {
              expect(
                rtmRollup.namedExports.filter(
                  namedExport => namedExport === exportedModule
                ).length
              ).toEqual(1);
            });
          });
        rtmRollup.namedExports.map(namedExport => {
          it(`provides a named export of ${namedExport}`, () => {
            expect(packageExport[namedExport]).not.toBeUndefined();
          });
        });
      }
    });
  });
