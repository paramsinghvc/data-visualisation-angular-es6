export default class Util {
    constructor() {

    }

    checkIfArray(d) {
        if (toString.call(d) === '[object Array]') return true;
        return false;
    }

    checkIfObject(d) {
        if (toString.call(d) === '[object Object]') return true;
        return false;
    }

    checkIfFunction(d) {
        if (toString.call(d) === '[object Function]') return true;
        return false;
    }

    /*  Usage : 
		let m = [1, 2, 3, 4];
        m = this.util.each(m, function(r) {
            console.log(r);
        });
    */

    each(arr, cb) {
        if (this.checkIfArray(arr)) {
            arr.forEach((el, index) => {
                cb(el, index);
            })
        } else if (this.checkIfObject(arr)) {
            for (let v of arr) {
                cb(v);
            }
        }
    }

    /*  Usage : 
		let m = [1, 2, 3, 4];
        m = this.util.map(m, function(r) {
            return 2 * r;
        });
    */
    map(arr, cb, conditionalClause, flipBool) {
        if (this.checkIfArray(arr)) {
            let a = [];
            arr.forEach((el, index) => {
                let res = cb(el, index);
                if (conditionalClause) {
                    if (conditionalClause(el) && !flipBool)
                        a.push(res);
                    else if (flipBool)
                        if (!conditionalClause(el))
                            a.push(res)
                } else {
                    a.push(res);
                }
            })
            return a;
        } else if (this.checkIfObject(arr)) {
            let obj = {};
            Object.keys(arr).forEach((k) => {
                obj[k] = cb(arr[k]);
            })
            return obj;
        }
    }

    /*  Usage : 
		let m = [1, 2, 3, 4];
        m = this.util.filter(m, function(r) {
            return r % 2 == 0;
        });
    */
    filter(arr, cb) {
        return this.map(arr, (el) => {
            return el;
        }, cb)
    }

    reject(arr, cb) {
        return this.map(arr, (el) => {
            return el;
        }, cb, true)
    }

    where(arr, props) {
        return this.filter(arr, (el) => {
            return this.propMatchExists(el, props);
        })
    }

    findWhere(arr, props) {
        let res = this.where(arr, props);
        return (res.length > 0) ? res[0] : null;
    }

    pluck(arr, prop) {
        let resArr = []
        this.each(arr, (el) => {
            resArr.push(el[prop]);
        });
        return resArr;
    }

    max(arr, cb) {
        let m;
        this.each(arr, (el) => {
            if (cb && isNaN(el)) {
                if (m == undefined || cb(el) > m) {
                    m = cb(el);
                }
            } else {
                if (m == undefined || el > m)
                    m = el;
            }
        })
        return m;
    }

    min(arr, cb) {
        let m;
        this.each(arr, (el) => {
            if (cb && isNaN(el)) {
                if (m == undefined || cb(el) < m) {
                    m = cb(el);
                }
            } else {
                if (m == undefined || el < m)
                    m = el;
            }
        })
        return m;
    }

    propMatchExists(obj, props) {
        //obj = {id : 2, name :'foo'}, props = {name :  'foo'}
        let res = true;
        Object.keys(props).forEach((k) => {
            if ((typeof obj[k] === 'undefined') || (obj[k] !== props[k])) {
                res = false;
                return false;
            }
        })
        return res;
    }
}
