const judge = (n, m) => {
    let memo = new Array(n).fill(0).map(() => new Array(n).fill(0));
    let mark = [];
    let k = m;
    for (let i = 0; i < n.length - m; i++) {
        for (let j = 0; j < n.length - m; j++) {
            while (--k > -1) {
                if (memo[i][j + k] === 2) {
                    mark.push(true);
                }
                if (mark.length === m) {
                    return true;
                }
            }
            k = m;
            mark = [];
            while (--k > -1) {
                if (memo[i + k][j] === 2) {
                    mark.push(true);
                }
                if (mark.length === m) {
                    return true;
                }
            }
            k = m;
            mark = [];
            while (--k > -1) {
                if (memo[i + k][j + k] === 2) {
                    mark.push(true);
                }
                if (mark.length === m) {
                    return true;
                }
            }
            k = m;
            mark = [];
            while (--k > -1) {
                if (memo[i - k][j - k] === 2) {
                    mark.push(true);
                }
                if (mark.length === m) {
                    return true;
                }
            }
        }
    }
    return false;
}
