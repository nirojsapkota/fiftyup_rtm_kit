import { ErrorBoundary } from '../error-boundary';

// @ponicode
describe("error_boundary.ErrorBoundary.componentDidCatch", () => {
    let inst3
    let inst
    let inst2

    beforeEach(() => {
        inst3 = new ErrorBoundary()
        inst = new ErrorBoundary({onError: () => {'Some error'}})
        inst2 = new ErrorBoundary(NaN)
    })

    test("0", () => {
        let result = inst2.componentDidCatch({}, false)
        expect(result).toMatchSnapshot()
    })

    test("1", () => {
        let result = inst.componentDidCatch('Has Error', true)
        expect(result).toMatchSnapshot()
    })
})
