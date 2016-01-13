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
    map(arr, cb, conditionalClause) {
        if (this.checkIfArray(arr)) {
            let a = [];
            arr.forEach((el, index) => {
                let res = cb(el, index);
                if (conditionalClause) {
                    if (conditionalClause(el))
                        a.push(res);
                } else {
                    a.push(res);
                }
            })
            return a;
        } else if (this.checkIfObject(arr)) {
            let obj = {};
            for (let v of arr) {
                cb(v);
            }
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

    reject(arr, cb){
    	this.filter(arr, (el) => {
    		return !cb(el);
    	})
    }

    where(arr, props) {
        return this.filter(arr, (el) => {
        	return this.propMatchExists(arr, props);
        })
    }

    findWhere(arr, props){
    	let res = this.where(arr, props);
    	return res.length > 0 ? : res[0] : null;
    }

    propMatchExists(arr, props) {
        Object.keys(props).forEach((k) => {
            if ((!k in arr) || (arr[k] != props[k]))
                return false;
        })
        return true;
    }
}
