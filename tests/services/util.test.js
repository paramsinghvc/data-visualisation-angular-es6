describe('Util Service', () => {
    let util;
    beforeEach(angular.mock.module('sachinApp'));
    beforeEach(inject(function(_util_) {
        util = _util_;
    }));

    describe('should validate the inputs', () => {
        it('should check if input is array', () => {
            let arr = [];
            expect(util.checkIfArray(arr)).toBeTruthy();
        })
        it('should check if input is not array', () => {
            let arr = {};
            expect(util.checkIfArray(arr)).toBeFalsy();
        })
        it('should check if input is object', () => {
            let obj = {};
            expect(util.checkIfObject(obj)).toBeTruthy();
        })
        it('should check if input is not an object', () => {
            let obj = [];
            expect(util.checkIfObject(obj)).toBeFalsy();
        })
        it('should check if input is function', () => {
            let obj = function() {};
            expect(util.checkIfFunction(obj)).toBeTruthy();
        })
        it('should check if input is not an function', () => {
            let obj = {};
            expect(util.checkIfFunction(obj)).toBeFalsy();
        })
    })

    describe('should test the data functions', () => {
        it('should test the each function', () => {
            let arr = [1, 2, 3, 4];
            spyOn(console, 'log');

            function cb(el) {
                console.log(el * 2);
            }
            util.each(arr, cb);
            expect(console.log.calls.allArgs()).toEqual([
                [2],
                [4],
                [6],
                [8]
            ]);
        });

        it('should test the map function', () => {
            let arr = [1, 2, 3, 4];

            arr = util.map(arr, function(el) {
                return el * el;
            });

            expect(arr).toEqual([1, 4, 9, 16]);
        });

        it('should test the filter function', () => {
            let arr = [1, 2, 3, 4];

            arr = util.filter(arr, function(el) {
                return (el % 2 == 0);
            });

            expect(arr).toEqual([2, 4]);
        });

        it('should test the reject function', () => {
            let arr = [1, 2, 3, 4];

            arr = util.reject(arr, function(el) {
                return (el % 2 == 0);
            });

            expect(arr).toEqual([1, 3]);
        });

        describe('where functions', () => {
            let arr = [{
                id: 1,
                name: 'foo'
            }, {
                id: 2,
                name: 'bar'
            }, {
                id: 3,
                name: 'baz'
            }];

            it('should test the where function', () => {

                let r1 = util.where(arr, {
                    name: 'bar'
                });

                let r2 = util.where(arr, {
                    name: 'bar',
                    age: 21
                });

                expect(r1).toEqual([{
                    id: 2,
                    name: 'bar'
                }]);

                expect(r2).toEqual([])
            });

            it('should test the whereFind function', () => {

                let r1 = util.findWhere(arr, {
                    name: 'bar'
                });

                let r2 = util.findWhere(arr, {
                    name: 'bar',
                    age: 21
                });

                expect(r1).toEqual({
                    id: 2,
                    name: 'bar'
                });

                expect(r2).toBeNull();
            });
        })


        it('should test the propMatchExists function', () => {
            let arr = {
                id: 1,
                name: 'foo'
            };

            let c1 = util.propMatchExists(arr, {
                name: 'foo'
            });
            let c2 = util.propMatchExists(arr, {
                name: 'bar'
            });
            let c3 = util.propMatchExists(arr, {
                foo: 'foo'
            });

            expect(c1).toBeTruthy();
            expect(c2).toBeFalsy();
            expect(c3).toBeFalsy();
        });

        it('should pluck the properties out of object', () => {
            let arr = [{
                id: 1,
                age: 21
            }, {
                id: 2,
                age: 22
            }, {
                id: 3,
                age: 23
            }];

            expect(util.pluck(arr, 'age')).toEqual([21, 22, 23]);
        })

        describe('should find the min max out of a collection', () => {
            let arr = [{
                id: 1,
                age: 21
            }, {
                id: 2,
                age: 25
            }, {
                id: 3,
                age: 23
            }];

            it('should find max from collection of objects', () => {

                expect(util.max(arr, (el) => {
                    return el.age;
                })).toEqual(25);

                expect(util.max([4, 3, 6, 1])).toEqual(6);
            });

            it('should find min from collection of objects', () => {

                expect(util.min(arr, (el) => {
                    return el.age;
                })).toEqual(21);

                expect(util.min([4, 3, 6, 1])).toEqual(1);
            });
        })

        describe('it should check the grouping and counting', () => {
            let collection = [{
                id: 1,
                age: 21
            }, {
                id: 2,
                age: 25
            }, {
                id: 3,
                age: 23
            }, {
                id: 4,
                age: 25
            }];

            it('should group the collection by certain property', () => {

                expect(util.groupBy(collection, 'age')).toEqual({
                    21: [{
                        id: 1,
                        age: 21
                    }],
                    23: [{
                        id: 3,
                        age: 23
                    }],
                    25: [{
                        id: 2,
                        age: 25
                    }, {
                        id: 4,
                        age: 25
                    }]
                })

                expect(util.countBy(collection, 'age')).toEqual({
                    21: 1,
                    23: 1,
                    25: 2
                })
            })
        })

        it('should convert the collection to an array', () => {
            expect(util.values({
                a: 'b',
                c: 'd',
                e: 'f'
            })).toEqual(['b', 'd', 'f'])
        })

        it('should find average of a field in a collection', () => {
            expect(util.average([{
                id: 1,
                age: 1
            }, {
                id: 1,
                age: 2
            }, {
                id: 1,
                age: 3
            }, {
                id: 1,
                age: 4
            }], 'age')).toEqual('3');

        })
    })
})
