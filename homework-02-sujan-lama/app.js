function process(list) {
    return new Promise((resolve, _) => {

        //Using foreach

        // const positive = []
        // const negative = []

        // let positiveSum = 0;
        // let negativeSum = 0;

        // list.forEach(v => {
        //     if (v >= 0) {
        //         positiveSum += v;
        //         positive.push(v);
        //     } else {
        //         negativeSum += v;
        //         negative.push(v);
        //     }
        // });



        // Using reduce only
        // const { positive, negative, positiveSum, negativeSum } = list.reduce((prev, next) => {
        //     if (next >= 0) {
        //         prev.positiveSum += next;
        //         prev.positive.push(next);
        //         return prev;
        //     }
        //     //negative condition
        //     prev.negativeSum += next;
        //     prev.negative.push(next);
        //     return prev;
        // }, { positive: [], negative: [], positiveSum: 0, negativeSum: 0 });


        // using filter and reduce
        const positive = list.filter(v => v >= 0);
        const negative = list.filter(v => v < 0);
        const positiveSum = positive.reduce((x, y) => x + y, 0);
        const negativeSum = negative.reduce((x, y) => x + y, 0);

        if (positiveSum > Math.abs(negativeSum)) {
            resolve(positive)
            return
        }
        resolve(negative)
    })
}

console.log('start');
process([4, -6, -3, 7]).then(console.log);
process([-7, 3, -2, 4]).then(console.log);
console.log('end');
